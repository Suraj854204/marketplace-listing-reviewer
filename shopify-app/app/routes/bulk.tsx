import { useState, useCallback } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigation, useSubmit, useActionData } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Text,
  Button,
  BlockStack,
  InlineStack,
  Banner,
  ProgressBar,
  IndexTable,
  Checkbox,
  Badge,
  Box,
  Select,
  EmptyState,
  useIndexResourceState,
} from "@shopify/polaris";
import { getProducts } from "~/services/shopify.server";
import { optimizeProductListing } from "~/services/gemini.server";
import type { OptimizationResult } from "~/services/gemini.server";

export const meta: MetaFunction = () => {
  return [{ title: "Bulk Optimize - QuickList AI" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const products = await getProducts("demo-shop.myshopify.com");
  return json({ products });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const productIds = (formData.get("productIds") as string).split(",");
  const marketplace = (formData.get("marketplace") as string) || "shopify";
  const products = await getProducts("demo-shop.myshopify.com");

  const results: Array<{
    productId: string;
    originalTitle: string;
    result: OptimizationResult;
  }> = [];

  for (const id of productIds) {
    const product = products.find((p) => p.id === id);
    if (!product) continue;

    const result = await optimizeProductListing({
      title: product.title,
      description: product.description,
      tags: product.tags,
      marketplace: marketplace as "amazon" | "ebay" | "etsy" | "shopify",
    });

    results.push({
      productId: id,
      originalTitle: product.title,
      result,
    });
  }

  return json({ success: true, results, totalProcessed: results.length });
}

type ActionData = {
  success: boolean;
  results: Array<{
    productId: string;
    originalTitle: string;
    result: OptimizationResult;
  }>;
  totalProcessed: number;
};

export default function BulkOptimizePage() {
  const { products } = useLoaderData<typeof loader>();
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const isOptimizing = navigation.state === "submitting";

  const [marketplace, setMarketplace] = useState("shopify");

  if (products.length === 0) {
    return (
      <Page title="Bulk Optimize" backAction={{ url: "/" }}>
        <Card>
          <EmptyState
            heading="No products found"
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          >
            <p>Add products to your Shopify store to start bulk optimization.</p>
          </EmptyState>
        </Card>
      </Page>
    );
  }

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(products);

  const handleBulkOptimize = useCallback(() => {
    if (selectedResources.length === 0) return;
    const formData = new FormData();
    formData.set("productIds", selectedResources.join(","));
    formData.set("marketplace", marketplace);
    submit(formData, { method: "post" });
  }, [selectedResources, marketplace, submit]);

  const rowMarkup = products.map((product, index) => {
    const optimized = actionData?.results?.find(
      (r) => r.productId === product.id
    );

    return (
      <IndexTable.Row
        id={product.id}
        key={product.id}
        selected={selectedResources.includes(product.id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {product.title}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" variant="bodySm" tone="subdued">
            {product.productType}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" variant="bodySm">
            {product.tags.slice(0, 3).join(", ")}
            {product.tags.length > 3 && ` +${product.tags.length - 3}`}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Badge tone={product.status === "active" ? "success" : "info"}>
            {product.status}
          </Badge>
        </IndexTable.Cell>
        <IndexTable.Cell>
          {optimized ? (
            <Badge tone="success">Optimized</Badge>
          ) : isOptimizing && selectedResources.includes(product.id) ? (
            <Badge tone="attention">Processing...</Badge>
          ) : (
            <Badge tone="info">Pending</Badge>
          )}
        </IndexTable.Cell>
      </IndexTable.Row>
    );
  });

  return (
    <Page
      title="Bulk Optimize"
      backAction={{ url: "/" }}
      primaryAction={{
        content: isOptimizing
          ? "Optimizing..."
          : `Optimize ${selectedResources.length} Product${selectedResources.length !== 1 ? "s" : ""}`,
        onAction: handleBulkOptimize,
        loading: isOptimizing,
        disabled: selectedResources.length === 0 || isOptimizing,
      }}
    >
      <BlockStack gap="500">
        <Banner tone="info">
          <p>
            Select products from your catalog and optimize them all at once.
            Each product will be individually optimized for the selected
            marketplace.
          </p>
        </Banner>

        <Layout>
          <Layout.Section>
            <Card padding="0">
              <Box padding="400">
                <InlineStack align="space-between" blockAlign="center">
                  <Text as="h2" variant="headingMd">
                    Products ({products.length})
                  </Text>
                  <Box maxWidth="200px">
                    <Select
                      label="Marketplace"
                      labelInline
                      options={[
                        { label: "Shopify", value: "shopify" },
                        { label: "Amazon", value: "amazon" },
                        { label: "eBay", value: "ebay" },
                        { label: "Etsy", value: "etsy" },
                      ]}
                      value={marketplace}
                      onChange={setMarketplace}
                    />
                  </Box>
                </InlineStack>
              </Box>

              <IndexTable
                resourceName={resourceName}
                itemCount={products.length}
                selectedItemsCount={
                  allResourcesSelected ? "All" : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                headings={[
                  { title: "Product" },
                  { title: "Type" },
                  { title: "Tags" },
                  { title: "Status" },
                  { title: "Optimization" },
                ]}
              >
                {rowMarkup}
              </IndexTable>
            </Card>
          </Layout.Section>
        </Layout>

        {isOptimizing && (
          <Card>
            <BlockStack gap="300">
              <Text as="h3" variant="headingSm">
                Optimization in Progress
              </Text>
              <ProgressBar progress={50} tone="primary" />
              <Text as="p" variant="bodySm" tone="subdued">
                Processing {selectedResources.length} products for{" "}
                {marketplace.charAt(0).toUpperCase() + marketplace.slice(1)}...
                This may take a moment.
              </Text>
            </BlockStack>
          </Card>
        )}

        {actionData?.success && !isOptimizing && (
          <BlockStack gap="400">
            <Banner
              title={`Successfully optimized ${actionData.totalProcessed} products`}
              tone="success"
            >
              <p>
                Review the results below and apply changes to your store.
              </p>
            </Banner>

            {actionData.results.map((item, index) => (
              <Card key={item.productId}>
                <BlockStack gap="300">
                  <InlineStack align="space-between" blockAlign="center">
                    <Text as="h3" variant="headingSm">
                      {item.originalTitle}
                    </Text>
                    <Button size="slim">Apply Changes</Button>
                  </InlineStack>

                  <Layout>
                    <Layout.Section variant="oneHalf">
                      <Box
                        padding="300"
                        background="bg-surface-secondary"
                        borderRadius="200"
                      >
                        <BlockStack gap="200">
                          <Text as="p" variant="bodySm" fontWeight="bold">
                            Original Title
                          </Text>
                          <Text as="p" variant="bodyMd">
                            {item.originalTitle}
                          </Text>
                        </BlockStack>
                      </Box>
                    </Layout.Section>
                    <Layout.Section variant="oneHalf">
                      <Box
                        padding="300"
                        background="bg-surface-success"
                        borderRadius="200"
                      >
                        <BlockStack gap="200">
                          <Text as="p" variant="bodySm" fontWeight="bold">
                            Optimized Title
                          </Text>
                          <Text as="p" variant="bodyMd">
                            {item.result.title}
                          </Text>
                        </BlockStack>
                      </Box>
                    </Layout.Section>
                  </Layout>

                  <InlineStack gap="200">
                    {item.result.improvements.slice(0, 3).map((imp, i) => (
                      <Badge key={i} tone="success">
                        {imp.split(":")[0]}
                      </Badge>
                    ))}
                  </InlineStack>
                </BlockStack>
              </Card>
            ))}

            <InlineStack align="end">
              <Button variant="primary">Apply All Changes</Button>
            </InlineStack>
          </BlockStack>
        )}
      </BlockStack>
    </Page>
  );
}

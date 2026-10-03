import { useState, useCallback } from "react";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Text,
  Button,
  BlockStack,
  InlineStack,
  TextField,
  Checkbox,
  Banner,
  Spinner,
  Tag,
  Box,
  Divider,
} from "@shopify/polaris";
import { optimizeProductListing } from "~/services/gemini.server";
import type { OptimizationResult } from "~/services/gemini.server";
import { OptimizationPreview } from "~/components/OptimizationPreview";

export const meta: MetaFunction = () => {
  return [{ title: "Optimize Product - QuickList AI" }];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const tagsRaw = formData.get("tags") as string;
  const marketplace = formData.get("marketplace") as
    | "amazon"
    | "ebay"
    | "etsy"
    | "shopify";
  const apiKey = (formData.get("apiKey") as string) || undefined;
  const brandVoice = (formData.get("brandVoice") as string) || undefined;

  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  try {
    const result = await optimizeProductListing(
      { title, description, tags, marketplace, brandVoice },
      apiKey
    );

    return json({
      success: true,
      result,
      original: { title, description, tags },
    });
  } catch (error) {
    return json({
      success: false,
      error: "Optimization failed. Please try again.",
      result: null,
      original: { title, description, tags },
    });
  }
}

type ActionData = {
  success: boolean;
  result: OptimizationResult | null;
  original: { title: string; description: string; tags: string[] };
  error?: string;
};

export default function OptimizePage() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const isOptimizing = navigation.state === "submitting";

  const [title, setTitle] = useState("Vintage Leather Messenger Bag");
  const [description, setDescription] = useState(
    "A classic leather messenger bag. Good for work or school. Brown color. Has multiple pockets and adjustable strap."
  );
  const [tagsInput, setTagsInput] = useState("bag, leather, messenger, brown");
  const [selectedMarketplace, setSelectedMarketplace] = useState<string>("amazon");
  const [applied, setApplied] = useState(false);

  const marketplaces = [
    { label: "Amazon", value: "amazon" },
    { label: "eBay", value: "ebay" },
    { label: "Etsy", value: "etsy" },
    { label: "Shopify", value: "shopify" },
  ];

  const handleOptimize = useCallback(() => {
    setApplied(false);
    const formData = new FormData();
    formData.set("title", title);
    formData.set("description", description);
    formData.set("tags", tagsInput);
    formData.set("marketplace", selectedMarketplace);
    submit(formData, { method: "post" });
  }, [title, description, tagsInput, selectedMarketplace, submit]);

  const handleApply = useCallback(() => {
    if (actionData?.result) {
      setTitle(actionData.result.title);
      setDescription(actionData.result.description);
      setTagsInput(actionData.result.tags.join(", "));
      setApplied(true);
    }
  }, [actionData]);

  return (
    <Page
      title="Optimize Product"
      backAction={{ url: "/" }}
      primaryAction={{
        content: isOptimizing ? "Optimizing..." : "Optimize",
        onAction: handleOptimize,
        loading: isOptimizing,
        disabled: !title || !description,
      }}
    >
      <BlockStack gap="500">
        {actionData?.error && (
          <Banner title="Optimization Error" tone="critical">
            <p>{actionData.error}</p>
          </Banner>
        )}

        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">
                  Product Details
                </Text>

                <TextField
                  label="Product Title"
                  value={title}
                  onChange={setTitle}
                  autoComplete="off"
                  placeholder="Enter your product title..."
                  helpText="The main title of your product as it appears in your store"
                />

                <TextField
                  label="Product Description"
                  value={description}
                  onChange={setDescription}
                  autoComplete="off"
                  multiline={6}
                  placeholder="Enter your product description..."
                  helpText="The full product description including features and benefits"
                />

                <TextField
                  label="Tags"
                  value={tagsInput}
                  onChange={setTagsInput}
                  autoComplete="off"
                  placeholder="tag1, tag2, tag3..."
                  helpText="Comma-separated list of product tags and keywords"
                />

                {tagsInput && (
                  <InlineStack gap="200">
                    {tagsInput
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                      .map((tag, i) => (
                        <Tag key={i}>{tag}</Tag>
                      ))}
                  </InlineStack>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">
                  Target Marketplace
                </Text>

                <BlockStack gap="200">
                  {marketplaces.map((mp) => (
                    <Checkbox
                      key={mp.value}
                      label={mp.label}
                      checked={selectedMarketplace === mp.value}
                      onChange={() => setSelectedMarketplace(mp.value)}
                    />
                  ))}
                </BlockStack>

                <Divider />

                <Text as="p" variant="bodySm" tone="subdued">
                  The AI will optimize your listing following the best practices
                  and SEO guidelines specific to the selected marketplace.
                </Text>
              </BlockStack>
            </Card>

            <Box paddingBlockStart="400">
              <Card>
                <BlockStack gap="300">
                  <Text as="h2" variant="headingMd">
                    Tips
                  </Text>
                  <BlockStack gap="200">
                    <Text as="p" variant="bodySm">
                      - Include your current product info as-is for best results
                    </Text>
                    <Text as="p" variant="bodySm">
                      - Add relevant tags even if imperfect - AI will improve them
                    </Text>
                    <Text as="p" variant="bodySm">
                      - Try different marketplaces to see tailored optimizations
                    </Text>
                    <Text as="p" variant="bodySm">
                      - Set your brand voice in Settings for consistent tone
                    </Text>
                  </BlockStack>
                </BlockStack>
              </Card>
            </Box>
          </Layout.Section>
        </Layout>

        {isOptimizing && (
          <Card>
            <Box padding="800">
              <BlockStack gap="400" align="center">
                <InlineStack align="center">
                  <Spinner size="large" />
                </InlineStack>
                <Text as="p" variant="bodyMd" alignment="center">
                  Analyzing your listing and generating optimizations for{" "}
                  {selectedMarketplace.charAt(0).toUpperCase() +
                    selectedMarketplace.slice(1)}
                  ...
                </Text>
              </BlockStack>
            </Box>
          </Card>
        )}

        {actionData?.success && actionData.result && !isOptimizing && (
          <BlockStack gap="400">
            <Divider />

            <InlineStack align="space-between" blockAlign="center">
              <Text as="h2" variant="headingLg">
                Optimization Results
              </Text>
              {!applied ? (
                <Button variant="primary" onClick={handleApply}>
                  Apply to Product
                </Button>
              ) : (
                <Banner title="Applied!" tone="success">
                  <p>Optimized content has been applied to the form above.</p>
                </Banner>
              )}
            </InlineStack>

            <OptimizationPreview
              original={actionData.original}
              optimized={actionData.result}
            />
          </BlockStack>
        )}
      </BlockStack>
    </Page>
  );
}

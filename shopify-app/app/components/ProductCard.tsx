import {
  Card,
  Text,
  BlockStack,
  InlineStack,
  Badge,
  Box,
  Checkbox,
  Tag,
  Thumbnail,
} from "@shopify/polaris";
import { ImageIcon } from "@shopify/polaris-icons";
import type { ShopifyProduct } from "~/services/shopify.server";

interface ProductCardProps {
  product: ShopifyProduct;
  selected: boolean;
  onToggle: (id: string) => void;
  optimized?: boolean;
  optimizedTitle?: string;
}

export function ProductCard({
  product,
  selected,
  onToggle,
  optimized = false,
  optimizedTitle,
}: ProductCardProps) {
  const imageSrc =
    product.images.length > 0 ? product.images[0].src : undefined;

  return (
    <Card>
      <InlineStack gap="400" blockAlign="start" wrap={false}>
        <Checkbox
          label=""
          labelHidden
          checked={selected}
          onChange={() => onToggle(product.id)}
        />

        <Thumbnail
          source={imageSrc || ImageIcon}
          alt={product.title}
          size="medium"
        />

        <Box minWidth="0" maxWidth="100%">
          <BlockStack gap="200">
            <InlineStack gap="200" blockAlign="center">
              <Text as="h3" variant="headingSm" truncate>
                {product.title}
              </Text>
              <Badge
                tone={product.status === "active" ? "success" : "info"}
              >
                {product.status}
              </Badge>
              {optimized && <Badge tone="success">Optimized</Badge>}
            </InlineStack>

            {optimized && optimizedTitle && (
              <Box
                padding="200"
                background="bg-surface-success"
                borderRadius="100"
              >
                <Text as="p" variant="bodySm">
                  New title: {optimizedTitle}
                </Text>
              </Box>
            )}

            <Text as="p" variant="bodySm" tone="subdued" truncate>
              {product.description}
            </Text>

            <InlineStack gap="200">
              <Text as="p" variant="bodySm" tone="subdued">
                {product.productType}
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                &middot;
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                {product.vendor}
              </Text>
            </InlineStack>

            <InlineStack gap="100">
              {product.tags.map((tag, i) => (
                <Tag key={i}>{tag}</Tag>
              ))}
            </InlineStack>
          </BlockStack>
        </Box>
      </InlineStack>
    </Card>
  );
}

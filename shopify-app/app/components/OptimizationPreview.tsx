import { useState, useCallback } from "react";
import {
  Card,
  Text,
  BlockStack,
  InlineStack,
  Button,
  Box,
  Badge,
  Tag,
  Layout,
  Divider,
  Banner,
} from "@shopify/polaris";
import type { OptimizationResult } from "~/services/gemini.server";

interface OptimizationPreviewProps {
  original: {
    title: string;
    description: string;
    tags: string[];
  };
  optimized: OptimizationResult;
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for environments without clipboard API
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <Button size="slim" onClick={handleCopy}>
      {copied ? "Copied!" : `Copy ${label}`}
    </Button>
  );
}

function FieldComparison({
  label,
  original,
  optimized,
  multiline = false,
}: {
  label: string;
  original: string;
  optimized: string;
  multiline?: boolean;
}) {
  return (
    <BlockStack gap="300">
      <Text as="h3" variant="headingSm">
        {label}
      </Text>
      <Layout>
        <Layout.Section variant="oneHalf">
          <Box
            padding="400"
            background="bg-surface-secondary"
            borderRadius="200"
            minHeight={multiline ? "120px" : undefined}
          >
            <BlockStack gap="200">
              <InlineStack align="space-between" blockAlign="center">
                <Badge>Original</Badge>
                <CopyButton text={original} label="" />
              </InlineStack>
              <Text
                as="p"
                variant="bodyMd"
                tone={multiline ? undefined : "subdued"}
              >
                {original || "(empty)"}
              </Text>
            </BlockStack>
          </Box>
        </Layout.Section>
        <Layout.Section variant="oneHalf">
          <Box
            padding="400"
            background="bg-surface-success"
            borderRadius="200"
            minHeight={multiline ? "120px" : undefined}
          >
            <BlockStack gap="200">
              <InlineStack align="space-between" blockAlign="center">
                <Badge tone="success">Optimized</Badge>
                <CopyButton text={optimized} label="" />
              </InlineStack>
              <Text as="p" variant="bodyMd">
                {optimized || "(empty)"}
              </Text>
            </BlockStack>
          </Box>
        </Layout.Section>
      </Layout>
    </BlockStack>
  );
}

export function OptimizationPreview({
  original,
  optimized,
}: OptimizationPreviewProps) {
  return (
    <BlockStack gap="500">
      {/* Improvement Badges */}
      <Card>
        <BlockStack gap="300">
          <Text as="h3" variant="headingSm">
            Improvements Made
          </Text>
          <BlockStack gap="200">
            {optimized.improvements.map((improvement, index) => (
              <Box
                key={index}
                padding="300"
                background="bg-surface-secondary"
                borderRadius="200"
              >
                <InlineStack gap="200" blockAlign="center">
                  <Badge tone="success">
                    {improvement.includes(":")
                      ? improvement.split(":")[0]
                      : `#${index + 1}`}
                  </Badge>
                  <Text as="p" variant="bodySm">
                    {improvement.includes(":")
                      ? improvement.split(":").slice(1).join(":").trim()
                      : improvement}
                  </Text>
                </InlineStack>
              </Box>
            ))}
          </BlockStack>
        </BlockStack>
      </Card>

      {/* Title Comparison */}
      <Card>
        <FieldComparison
          label="Title"
          original={original.title}
          optimized={optimized.title}
        />
      </Card>

      {/* Description Comparison */}
      <Card>
        <FieldComparison
          label="Description"
          original={original.description}
          optimized={optimized.description}
          multiline
        />
      </Card>

      {/* Tags Comparison */}
      <Card>
        <BlockStack gap="300">
          <Text as="h3" variant="headingSm">
            Tags
          </Text>
          <Layout>
            <Layout.Section variant="oneHalf">
              <Box
                padding="400"
                background="bg-surface-secondary"
                borderRadius="200"
              >
                <BlockStack gap="200">
                  <Badge>Original</Badge>
                  <InlineStack gap="200" wrap>
                    {original.tags.length > 0 ? (
                      original.tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)
                    ) : (
                      <Text as="p" variant="bodySm" tone="subdued">
                        No tags
                      </Text>
                    )}
                  </InlineStack>
                </BlockStack>
              </Box>
            </Layout.Section>
            <Layout.Section variant="oneHalf">
              <Box
                padding="400"
                background="bg-surface-success"
                borderRadius="200"
              >
                <BlockStack gap="200">
                  <InlineStack align="space-between" blockAlign="center">
                    <Badge tone="success">Optimized</Badge>
                    <CopyButton
                      text={optimized.tags.join(", ")}
                      label=""
                    />
                  </InlineStack>
                  <InlineStack gap="200" wrap>
                    {optimized.tags.map((tag, i) => {
                      const isNew = !original.tags
                        .map((t) => t.toLowerCase())
                        .includes(tag.toLowerCase());
                      return (
                        <Tag key={i}>
                          {isNew ? `+ ${tag}` : tag}
                        </Tag>
                      );
                    })}
                  </InlineStack>
                </BlockStack>
              </Box>
            </Layout.Section>
          </Layout>
        </BlockStack>
      </Card>

      {/* Marketplace Badge */}
      <InlineStack align="center">
        <Badge>
          Optimized for {optimized.marketplace.charAt(0).toUpperCase() + optimized.marketplace.slice(1)}
        </Badge>
      </InlineStack>
    </BlockStack>
  );
}

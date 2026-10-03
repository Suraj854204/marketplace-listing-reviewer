import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Text,
  Button,
  CalloutCard,
  BlockStack,
  InlineGrid,
  InlineStack,
  Icon,
  Box,
  Divider,
  EmptyState,
  SkeletonPage,
  SkeletonBodyText,
  SkeletonDisplayText,
} from "@shopify/polaris";
import {
  ProductIcon,
  AutomationIcon,
  SettingsIcon,
  CheckCircleIcon,
  CircleIcon,
} from "@shopify/polaris-icons";

export const meta: MetaFunction = () => {
  return [
    { title: "QuickList AI - Dashboard" },
    { name: "description", content: "AI-powered product listing optimization" },
  ];
};

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
}

function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h3" variant="headingSm" tone="subdued">
          {title}
        </Text>
        <Text as="p" variant="headingXl">
          {value}
        </Text>
        <Text as="p" variant="bodySm" tone="subdued">
          {subtitle}
        </Text>
      </BlockStack>
    </Card>
  );
}

interface OnboardingStep {
  label: string;
  url: string;
  completed: boolean;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onboardingSteps: OnboardingStep[] = [
    { label: "Configure your API key", url: "/settings", completed: false },
    { label: "Optimize your first product", url: "/optimize", completed: false },
    { label: "Try bulk optimization", url: "/bulk", completed: false },
  ];

  if (isLoading) {
    return (
      <Page title="QuickList AI">
        <BlockStack gap="500">
          <SkeletonDisplayText size="small" />
          <InlineGrid columns={3} gap="400">
            <Card><SkeletonBodyText lines={3} /></Card>
            <Card><SkeletonBodyText lines={3} /></Card>
            <Card><SkeletonBodyText lines={3} /></Card>
          </InlineGrid>
        </BlockStack>
      </Page>
    );
  }

  return (
    <Page title="QuickList AI">
      <BlockStack gap="500">
        {showOnboarding && (
          <CalloutCard
            title="Welcome to QuickList AI!"
            illustration="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            primaryAction={{
              content: "Get Started",
              url: "/settings",
            }}
            onDismiss={() => setShowOnboarding(false)}
          >
            <BlockStack gap="300">
              <p>
                Complete these steps to get the most out of QuickList AI.
              </p>
              {onboardingSteps.map((step, index) => (
                <InlineStack key={index} gap="200" blockAlign="center">
                  <Icon
                    source={step.completed ? CheckCircleIcon : CircleIcon}
                    tone={step.completed ? "success" : "subdued"}
                  />
                  <Button
                    variant="plain"
                    onClick={() => navigate(step.url)}
                  >
                    {`${index + 1}. ${step.label}`}
                  </Button>
                </InlineStack>
              ))}
            </BlockStack>
          </CalloutCard>
        )}

        <Text as="h2" variant="headingMd">
          Performance Overview
        </Text>

        <InlineGrid columns={3} gap="400">
          <StatCard
            title="Products Optimized"
            value="127"
            subtitle="+12 this week"
          />
          <StatCard
            title="Avg. Improvement"
            value="+34%"
            subtitle="SEO score increase"
          />
          <StatCard
            title="Time Saved"
            value="18h"
            subtitle="This month vs manual editing"
          />
        </InlineGrid>

        <Divider />

        <Text as="h2" variant="headingMd">
          Quick Actions
        </Text>

        <InlineGrid columns={3} gap="400">
          <Card>
            <BlockStack gap="300">
              <InlineStack align="start" gap="200">
                <Icon source={ProductIcon} tone="base" />
                <Text as="h3" variant="headingSm">
                  Optimize Product
                </Text>
              </InlineStack>
              <Text as="p" variant="bodyMd" tone="subdued">
                Optimize a single product listing with AI-powered suggestions
                for title, description, and tags.
              </Text>
              <Button
                variant="primary"
                onClick={() => navigate("/optimize")}
              >
                Optimize Now
              </Button>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="300">
              <InlineStack align="start" gap="200">
                <Icon source={AutomationIcon} tone="base" />
                <Text as="h3" variant="headingSm">
                  Bulk Optimize
                </Text>
              </InlineStack>
              <Text as="p" variant="bodyMd" tone="subdued">
                Select multiple products and optimize them all at once. Perfect
                for large catalog updates.
              </Text>
              <Button onClick={() => navigate("/bulk")}>
                Start Bulk Optimization
              </Button>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="300">
              <InlineStack align="start" gap="200">
                <Icon source={SettingsIcon} tone="base" />
                <Text as="h3" variant="headingSm">
                  Settings
                </Text>
              </InlineStack>
              <Text as="p" variant="bodyMd" tone="subdued">
                Configure your API key, brand voice, default marketplaces, and
                notification preferences.
              </Text>
              <Button onClick={() => navigate("/settings")}>
                Configure Settings
              </Button>
            </BlockStack>
          </Card>
        </InlineGrid>

        <Divider />

        <Layout>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="300">
                <Text as="h3" variant="headingSm">
                  Recent Optimizations
                </Text>
                {(() => {
                  const recentOptimizations = [
                    {
                      name: "Vintage Leather Messenger Bag",
                      marketplace: "Amazon",
                      improvement: "+41%",
                      time: "2 hours ago",
                    },
                    {
                      name: "Organic Cotton T-Shirt Pack",
                      marketplace: "Etsy",
                      improvement: "+28%",
                      time: "5 hours ago",
                    },
                    {
                      name: "Wireless Bluetooth Earbuds Pro",
                      marketplace: "eBay",
                      improvement: "+35%",
                      time: "1 day ago",
                    },
                    {
                      name: "Handmade Ceramic Coffee Mug",
                      marketplace: "Shopify",
                      improvement: "+22%",
                      time: "2 days ago",
                    },
                  ];

                  if (recentOptimizations.length === 0) {
                    return (
                      <EmptyState
                        heading="No optimizations yet"
                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                        action={{
                          content: "Optimize a Product",
                          url: "/optimize",
                        }}
                      >
                        <p>
                          Start optimizing your product listings to see results
                          here.
                        </p>
                      </EmptyState>
                    );
                  }

                  return (
                    <BlockStack gap="200">
                      {recentOptimizations.map((item, index) => (
                        <Box
                          key={index}
                          padding="300"
                          background="bg-surface-secondary"
                          borderRadius="200"
                        >
                          <InlineStack align="space-between" blockAlign="center">
                            <BlockStack gap="100">
                              <Text as="p" variant="bodyMd" fontWeight="semibold">
                                {item.name}
                              </Text>
                              <Text as="p" variant="bodySm" tone="subdued">
                                {item.marketplace} &middot; {item.time}
                              </Text>
                            </BlockStack>
                            <Text as="p" variant="bodyMd" tone="success">
                              {item.improvement}
                            </Text>
                          </InlineStack>
                        </Box>
                      ))}
                    </BlockStack>
                  );
                })()}
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="300">
                <Text as="h3" variant="headingSm">
                  Your Plan
                </Text>
                <Box
                  padding="400"
                  background="bg-surface-secondary"
                  borderRadius="200"
                >
                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text as="p" variant="headingMd">
                        Free Plan
                      </Text>
                      <Text as="p" variant="bodyMd" tone="subdued">
                        $0/mo
                      </Text>
                    </InlineStack>
                    <Text as="p" variant="bodySm" tone="subdued">
                      3 of 5 daily optimizations used
                    </Text>
                    <Box
                      background="bg-fill-info"
                      borderRadius="100"
                      minHeight="8px"
                    >
                      <Box
                        background="bg-fill-success"
                        borderRadius="100"
                        minHeight="8px"
                        maxWidth="60%"
                      />
                    </Box>
                    <Button onClick={() => navigate("/billing")}>
                      Upgrade Plan
                    </Button>
                  </BlockStack>
                </Box>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}

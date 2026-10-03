import { useState, useCallback } from "react";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Text,
  Button,
  BlockStack,
  InlineStack,
  Banner,
  Divider,
  Box,
  Icon,
  Badge,
} from "@shopify/polaris";
import { CheckIcon } from "@shopify/polaris-icons";
import { getAllPlans } from "~/services/billing.server";
import { createAppSubscription } from "~/services/shopify.server";
import { PlanCard } from "~/components/PlanCard";

export const meta: MetaFunction = () => {
  return [{ title: "Billing - QuickList AI" }];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const planId = formData.get("planId") as string;
  const plans = getAllPlans();
  const plan = plans.find((p) => p.id === planId);

  if (!plan) {
    return json({ success: false, error: "Invalid plan selected." });
  }

  if (plan.price === 0) {
    return json({
      success: true,
      message: "You are now on the Free plan.",
      planId: "free",
    });
  }

  try {
    const result = await createAppSubscription("demo-shop.myshopify.com", {
      name: plan.name,
      price: plan.price,
      trialDays: 7,
    });

    return json({
      success: true,
      message: `Redirecting to Shopify to confirm your ${plan.name} subscription...`,
      confirmationUrl: result.confirmationUrl,
      planId,
    });
  } catch (error) {
    return json({
      success: false,
      error: "Failed to create subscription. Please try again.",
    });
  }
}

type ActionData = {
  success: boolean;
  message?: string;
  error?: string;
  confirmationUrl?: string;
  planId?: string;
};

export default function BillingPage() {
  const actionData = useActionData<ActionData>();
  const submit = useSubmit();
  const [currentPlan] = useState("free");

  const plans = getAllPlans();

  const handleSubscribe = useCallback(
    (planId: string) => {
      const formData = new FormData();
      formData.set("planId", planId);
      submit(formData, { method: "post" });
    },
    [submit]
  );

  return (
    <Page title="Plans & Billing" backAction={{ url: "/" }}>
      <BlockStack gap="500">
        {actionData?.success && actionData.message && (
          <Banner title={actionData.message} tone="success" onDismiss={() => {}}>
            {actionData.confirmationUrl && (
              <p>
                In a live Shopify app, you would be redirected to:{" "}
                <strong>{actionData.confirmationUrl}</strong>
              </p>
            )}
          </Banner>
        )}

        {actionData?.error && (
          <Banner title={actionData.error} tone="critical" onDismiss={() => {}} />
        )}

        <Banner tone="info">
          <p>
            All paid plans include a <strong>7-day free trial</strong>. Cancel
            anytime directly from your Shopify admin. Billing is handled securely
            through Shopify.
          </p>
        </Banner>

        <InlineStack gap="400" align="center" wrap={false}>
          {plans.map((plan) => (
            <Box key={plan.id} minWidth="300px" maxWidth="340px">
              <PlanCard
                plan={plan}
                isCurrent={currentPlan === plan.id}
                onSubscribe={() => handleSubscribe(plan.id)}
              />
            </Box>
          ))}
        </InlineStack>

        <Divider />

        {/* Feature Comparison Table */}
        <Card>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">
              Feature Comparison
            </Text>

            <Box>
              {[
                {
                  feature: "Daily optimizations",
                  free: "5 per day",
                  pro: "Unlimited",
                  business: "Unlimited",
                },
                {
                  feature: "Bulk optimization",
                  free: "Not available",
                  pro: "Up to 50 products",
                  business: "Unlimited",
                },
                {
                  feature: "Marketplaces",
                  free: "Amazon, Shopify",
                  pro: "All 4 marketplaces",
                  business: "All 4 + custom templates",
                },
                {
                  feature: "Brand voice",
                  free: "Not available",
                  pro: "Included",
                  business: "Included",
                },
                {
                  feature: "A/B testing suggestions",
                  free: "Not available",
                  pro: "Not available",
                  business: "Included",
                },
                {
                  feature: "Competitor analysis",
                  free: "Not available",
                  pro: "Not available",
                  business: "Included",
                },
                {
                  feature: "API access",
                  free: "Not available",
                  pro: "Not available",
                  business: "Included",
                },
                {
                  feature: "Team seats",
                  free: "1 user",
                  pro: "1 user",
                  business: "Up to 5 users",
                },
                {
                  feature: "Support",
                  free: "Community",
                  pro: "Email",
                  business: "Priority phone & email",
                },
              ].map((row, index) => (
                <Box
                  key={index}
                  padding="300"
                  background={
                    index % 2 === 0 ? "bg-surface-secondary" : "bg-surface"
                  }
                >
                  <InlineStack align="space-between">
                    <Box minWidth="200px">
                      <Text as="p" variant="bodyMd" fontWeight="semibold">
                        {row.feature}
                      </Text>
                    </Box>
                    <Box minWidth="150px">
                      <Text as="p" variant="bodySm" alignment="center">
                        {row.free}
                      </Text>
                    </Box>
                    <Box minWidth="150px">
                      <Text as="p" variant="bodySm" alignment="center">
                        {row.pro}
                      </Text>
                    </Box>
                    <Box minWidth="150px">
                      <Text as="p" variant="bodySm" alignment="center">
                        {row.business}
                      </Text>
                    </Box>
                  </InlineStack>
                </Box>
              ))}
            </Box>
          </BlockStack>
        </Card>

        {/* FAQ */}
        <Card>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">
              Frequently Asked Questions
            </Text>

            <BlockStack gap="300">
              <BlockStack gap="100">
                <Text as="p" variant="bodyMd" fontWeight="bold">
                  Can I cancel anytime?
                </Text>
                <Text as="p" variant="bodyMd">
                  Yes! All subscriptions are managed through Shopify billing. You
                  can cancel directly from your Shopify admin at any time with no
                  penalties.
                </Text>
              </BlockStack>

              <Divider />

              <BlockStack gap="100">
                <Text as="p" variant="bodyMd" fontWeight="bold">
                  What happens to my optimizations if I downgrade?
                </Text>
                <Text as="p" variant="bodyMd">
                  All previously optimized product listings remain unchanged.
                  Downgrading only affects your daily optimization limit going
                  forward.
                </Text>
              </BlockStack>

              <Divider />

              <BlockStack gap="100">
                <Text as="p" variant="bodyMd" fontWeight="bold">
                  Do I need my own API key?
                </Text>
                <Text as="p" variant="bodyMd">
                  No. Paid plans include AI processing. The BYOK option in
                  Settings is for users who want to use their own Google Gemini
                  API key for additional control or cost management.
                </Text>
              </BlockStack>
            </BlockStack>
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}

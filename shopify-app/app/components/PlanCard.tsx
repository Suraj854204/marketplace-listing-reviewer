import {
  Card,
  Text,
  Button,
  BlockStack,
  InlineStack,
  Box,
  Badge,
  Icon,
  Divider,
} from "@shopify/polaris";
import { CheckIcon } from "@shopify/polaris-icons";
import type { Plan } from "~/services/billing.server";

interface PlanCardProps {
  plan: Plan;
  isCurrent: boolean;
  onSubscribe: () => void;
}

export function PlanCard({ plan, isCurrent, onSubscribe }: PlanCardProps) {
  return (
    <Card>
      <BlockStack gap="400">
        {/* Plan Header */}
        <BlockStack gap="200">
          <InlineStack align="space-between" blockAlign="center">
            <Text as="h2" variant="headingLg">
              {plan.name}
            </Text>
            {plan.recommended && <Badge tone="attention">Most Popular</Badge>}
            {isCurrent && <Badge tone="success">Current Plan</Badge>}
          </InlineStack>

          <InlineStack gap="100" blockAlign="baseline">
            <Text as="p" variant="heading2xl">
              ${plan.price}
            </Text>
            {plan.price > 0 && (
              <Text as="p" variant="bodyMd" tone="subdued">
                /month
              </Text>
            )}
          </InlineStack>

          <Text as="p" variant="bodySm" tone="subdued">
            {plan.optimizationsPerDay === -1
              ? "Unlimited optimizations"
              : `${plan.optimizationsPerDay} optimizations per day`}
          </Text>
        </BlockStack>

        <Divider />

        {/* Features List */}
        <BlockStack gap="200">
          {plan.features.map((feature, index) => (
            <InlineStack key={index} gap="200" blockAlign="start" wrap={false}>
              <Box minWidth="20px">
                <Icon source={CheckIcon} tone="success" />
              </Box>
              <Text as="p" variant="bodySm">
                {feature}
              </Text>
            </InlineStack>
          ))}
        </BlockStack>

        {/* Action Button */}
        <Box paddingBlockStart="200">
          {isCurrent ? (
            <Button disabled fullWidth>
              Current Plan
            </Button>
          ) : plan.price === 0 ? (
            <Button fullWidth onClick={onSubscribe}>
              Downgrade to Free
            </Button>
          ) : (
            <Button
              variant={plan.recommended ? "primary" : "secondary"}
              fullWidth
              onClick={onSubscribe}
            >
              {plan.price > 0 ? `Start 7-Day Free Trial` : "Get Started"}
            </Button>
          )}
        </Box>
      </BlockStack>
    </Card>
  );
}

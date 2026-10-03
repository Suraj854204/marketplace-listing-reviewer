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
  TextField,
  Checkbox,
  Banner,
  Divider,
  Box,
  FormLayout,
} from "@shopify/polaris";

export const meta: MetaFunction = () => {
  return [{ title: "Settings - QuickList AI" }];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const section = formData.get("section") as string;

  switch (section) {
    case "apiKey": {
      const apiKey = formData.get("apiKey") as string;
      // In production: encrypt and store in Shopify metafields or your own DB
      console.log("[settings] Saving API key:", apiKey ? "***" : "(empty)");
      return json({
        success: true,
        message: "API key saved successfully.",
        section: "apiKey",
      });
    }
    case "brandVoice": {
      const brandVoice = formData.get("brandVoice") as string;
      console.log("[settings] Saving brand voice:", brandVoice.slice(0, 50));
      return json({
        success: true,
        message: "Brand voice saved successfully.",
        section: "brandVoice",
      });
    }
    case "marketplaces": {
      const amazon = formData.get("amazon") === "true";
      const ebay = formData.get("ebay") === "true";
      const etsy = formData.get("etsy") === "true";
      const shopify = formData.get("shopify") === "true";
      console.log("[settings] Saving default marketplaces:", {
        amazon,
        ebay,
        etsy,
        shopify,
      });
      return json({
        success: true,
        message: "Default marketplaces saved.",
        section: "marketplaces",
      });
    }
    case "notifications": {
      const emailOptimization = formData.get("emailOptimization") === "true";
      const emailBilling = formData.get("emailBilling") === "true";
      const emailWeekly = formData.get("emailWeekly") === "true";
      console.log("[settings] Saving notifications:", {
        emailOptimization,
        emailBilling,
        emailWeekly,
      });
      return json({
        success: true,
        message: "Notification preferences saved.",
        section: "notifications",
      });
    }
    default:
      return json({ success: false, message: "Unknown section.", section: "" });
  }
}

type ActionData = {
  success: boolean;
  message: string;
  section: string;
};

export default function SettingsPage() {
  const actionData = useActionData<ActionData>();
  const submit = useSubmit();

  // API Key
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);

  // Brand Voice
  const [brandVoice, setBrandVoice] = useState(
    "Professional yet approachable. We speak to quality-conscious buyers who value craftsmanship and sustainability. Use confident, descriptive language without being pushy."
  );

  // Default Marketplaces
  const [marketplaces, setMarketplaces] = useState({
    amazon: true,
    ebay: false,
    etsy: true,
    shopify: true,
  });

  // Notifications
  const [notifications, setNotifications] = useState({
    emailOptimization: true,
    emailBilling: true,
    emailWeekly: false,
  });

  const saveSection = useCallback(
    (section: string, data: Record<string, string>) => {
      const formData = new FormData();
      formData.set("section", section);
      for (const [key, value] of Object.entries(data)) {
        formData.set(key, value);
      }
      submit(formData, { method: "post" });
    },
    [submit]
  );

  return (
    <Page title="Settings" backAction={{ url: "/" }}>
      <BlockStack gap="500">
        {actionData?.success && (
          <Banner title={actionData.message} tone="success" onDismiss={() => {}} />
        )}

        {/* BYOK Section */}
        <Layout>
          <Layout.AnnotatedSection
            title="Gemini API Key (BYOK)"
            description="Bring your own Google Gemini API key for AI-powered optimizations. Without a key, the app runs in demo mode with pre-built suggestions."
          >
            <Card>
              <BlockStack gap="400">
                <TextField
                  label="API Key"
                  value={apiKey}
                  onChange={setApiKey}
                  autoComplete="off"
                  type={showApiKey ? "text" : "password"}
                  placeholder="AIzaSy..."
                  helpText="Get your API key from Google AI Studio (aistudio.google.com)"
                  connectedRight={
                    <Button onClick={() => setShowApiKey(!showApiKey)}>
                      {showApiKey ? "Hide" : "Show"}
                    </Button>
                  }
                />
                <InlineStack align="end">
                  <Button
                    variant="primary"
                    onClick={() => saveSection("apiKey", { apiKey })}
                  >
                    Save API Key
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>

        <Divider />

        {/* Brand Voice Section */}
        <Layout>
          <Layout.AnnotatedSection
            title="Brand Voice"
            description="Describe your brand's tone and style. The AI will match this voice when generating optimized listings."
          >
            <Card>
              <BlockStack gap="400">
                <TextField
                  label="Brand Voice Description"
                  value={brandVoice}
                  onChange={setBrandVoice}
                  autoComplete="off"
                  multiline={5}
                  placeholder="Describe your brand voice... e.g., Professional, friendly, luxury-oriented..."
                  helpText="Be specific about tone, vocabulary, and what makes your brand unique"
                />
                <InlineStack align="end">
                  <Button
                    variant="primary"
                    onClick={() => saveSection("brandVoice", { brandVoice })}
                  >
                    Save Brand Voice
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>

        <Divider />

        {/* Default Marketplaces Section */}
        <Layout>
          <Layout.AnnotatedSection
            title="Default Marketplaces"
            description="Select which marketplaces should be pre-selected when optimizing products."
          >
            <Card>
              <BlockStack gap="400">
                <FormLayout>
                  <Checkbox
                    label="Amazon"
                    helpText="Optimize for Amazon search algorithm (A9)"
                    checked={marketplaces.amazon}
                    onChange={(checked) =>
                      setMarketplaces({ ...marketplaces, amazon: checked })
                    }
                  />
                  <Checkbox
                    label="eBay"
                    helpText="Optimize for eBay Best Match search"
                    checked={marketplaces.ebay}
                    onChange={(checked) =>
                      setMarketplaces({ ...marketplaces, ebay: checked })
                    }
                  />
                  <Checkbox
                    label="Etsy"
                    helpText="Optimize for Etsy search and discovery"
                    checked={marketplaces.etsy}
                    onChange={(checked) =>
                      setMarketplaces({ ...marketplaces, etsy: checked })
                    }
                  />
                  <Checkbox
                    label="Shopify"
                    helpText="Optimize for Shopify storefront SEO"
                    checked={marketplaces.shopify}
                    onChange={(checked) =>
                      setMarketplaces({ ...marketplaces, shopify: checked })
                    }
                  />
                </FormLayout>
                <InlineStack align="end">
                  <Button
                    variant="primary"
                    onClick={() =>
                      saveSection("marketplaces", {
                        amazon: String(marketplaces.amazon),
                        ebay: String(marketplaces.ebay),
                        etsy: String(marketplaces.etsy),
                        shopify: String(marketplaces.shopify),
                      })
                    }
                  >
                    Save Marketplaces
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>

        <Divider />

        {/* Notifications Section */}
        <Layout>
          <Layout.AnnotatedSection
            title="Notifications"
            description="Control which email notifications you receive from QuickList AI."
          >
            <Card>
              <BlockStack gap="400">
                <FormLayout>
                  <Checkbox
                    label="Optimization complete"
                    helpText="Get notified when bulk optimizations finish processing"
                    checked={notifications.emailOptimization}
                    onChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        emailOptimization: checked,
                      })
                    }
                  />
                  <Checkbox
                    label="Billing updates"
                    helpText="Receive notifications about plan changes and invoices"
                    checked={notifications.emailBilling}
                    onChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        emailBilling: checked,
                      })
                    }
                  />
                  <Checkbox
                    label="Weekly performance report"
                    helpText="Get a weekly summary of optimization results and store performance"
                    checked={notifications.emailWeekly}
                    onChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        emailWeekly: checked,
                      })
                    }
                  />
                </FormLayout>
                <InlineStack align="end">
                  <Button
                    variant="primary"
                    onClick={() =>
                      saveSection("notifications", {
                        emailOptimization: String(notifications.emailOptimization),
                        emailBilling: String(notifications.emailBilling),
                        emailWeekly: String(notifications.emailWeekly),
                      })
                    }
                  >
                    Save Notifications
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </BlockStack>
    </Page>
  );
}

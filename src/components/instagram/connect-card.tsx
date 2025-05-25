"use client";
import { Facebook, Check } from "lucide-react";
import { useState } from "react";
import Alert from "../ui/alert/Alert";
import { useAuth } from "../../context/AuthContext";
interface ConnectedAccount {
  name: string;
  pageId: string;
  avatar: string;
}

export function InstagramConnectCard() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectedAccount, setConnectedAccount] =
    useState<ConnectedAccount | null>(null);

  const benefits = [
    {
      title: "Manage Comments",
      description: "View and respond to comments on your posts",
    },
    {
      title: "Direct Messages",
      description: "Read and reply to direct messages",
    },
    {
      title: "Analytics",
      description: "View insights and performance metrics",
    },
    {
      title: "Automated Responses",
      description: "Set up auto-replies for common questions",
    },
  ];

  const handleConnect = () => {
    // Simulate connection process
    setConnectedAccount({
      name: "Olaai service",
      pageId: "639212699276806",
      avatar: "/placeholder.svg?height=80&width=80",
    });
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setConnectedAccount(null);
  };

  const handleRefresh = () => {
    // Simulate refresh process
    console.log("Refreshing connection...");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Connect Instagram Account Section */}
      <div className="rounded-xl border border-gray-900 dark:border-white  p-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Connect Instagram Account
          </h2>
          <p className="text-gray-400 mb-8">
            Link your Instagram business account to manage comments, messages,
            and analytics
          </p>

          {!isConnected ? (
            // Initial Connection State
            <div className="text-center">
              {/* Facebook Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-24 h-24 rounded-full bg-blue-900 flex items-center justify-center">
                  <Facebook className="w-12 h-12 text-gray-400" />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Connect Your Account
              </h3>
              <p className="text-gray-400 mb-8">
                Connect your Instagram business account via Facebook to manage
                your social media presence
              </p>

              <button
                onClick={handleConnect}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-100 dark:bg-white transition-colors"
              >
                Connect Instagram via Facebook
              </button>
            </div>
          ) : (
            // Connected State
            <div>
              {/* Connected Account Info */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src={connectedAccount?.avatar || "/placeholder.svg"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {connectedAccount?.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Page ID: {connectedAccount?.pageId}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleDisconnect}
                  className="flex-1 px-4 py-3 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Disconnect Page
                </button>
                <button
                  onClick={handleRefresh}
                  className="flex-1 px-4 py-3 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Refresh Connection
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Connection Benefits Section */}
      <div className="rounded-xl border border-gray-900 dark:border-white p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Connection Benefits
        </h2>
        <p className="text-gray-400 mb-8">
          What you can do after connecting your Instagram account
        </p>

        <div className="space-y-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-gray-900 dark:text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {benefit.title}
                </h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function InstagramConnectionGuide() {
  const steps = [
    {
      number: 1,
      title: "Convert to Instagram Business Account",
      description: "",
    },
    {
      number: 2,
      title: "Create a Facebook Page",
      description: "",
    },
    {
      number: 3,
      title: "Link Instagram to Facebook Page",
      description:
        "Connect your Instagram Business account to your Facebook Page:",
      subSteps: [
        "Go to your Facebook Page",
        'Click "Settings" at the bottom of the left sidebar',
        'Select "Instagram" from the left menu',
        'Click "Connect Account" and enter your Instagram login details',
        "Follow the prompts to complete the connection",
      ],
    },
    {
      number: 4,
      title: "Connect to Our Platform",
      description: "",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Why Connect Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Why Connect Instagram via Facebook?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="rounded-xl border border-gray-700 bg-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              Instagram API Requirements
            </h3>
            <p className="text-gray-400">
              Instagram's API requires business accounts to be connected to a
              Facebook page. This is Meta's official requirement for accessing
              Instagram's business features.
            </p>
          </div>
          <div className="rounded-xl border border-gray-700 bg-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              Access to Business Features
            </h3>
            <p className="text-gray-400">
              Connecting via Facebook gives you access to analytics, automated
              responses, and the ability to manage comments and messages from
              our platform.
            </p>
          </div>
        </div>

        {/* Prerequisites Info */}
        <Alert
          variant="info"
          title="Prerequisites"
          message="Before connecting, you must have a Facebook Page linked to your
        Instagram Business account.."
          showLink={true}
          linkHref="/"
          linkText="Learn more"
        />
      </div>

      {/* Step-by-Step Guide */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Step-by-Step Connection Guide
          </h2>
        </div>

        <div className="rounded-xl border border-gray-700 bg-gray-700 p-8">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {step.number}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-gray-400 mb-3">{step.description}</p>
                  )}
                  {step.subSteps && (
                    <ol className="list-decimal list-inside space-y-2 text-gray-400 ml-4">
                      {step.subSteps.map((subStep, subIndex) => (
                        <li key={subIndex}>{subStep}</li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

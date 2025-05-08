import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { integrationIcons } from '@/utils/icon';

type Integration = {
  id: string;
  name: string;
  description: string;
  connected: boolean;
};

export default function IntegrationsButton() {
  const [isOpen, setIsOpen] = useState(false);

  const integrations: Integration[] = [
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Sync your calendar events',
      connected: false,
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Connect with your Slack workspace',
      connected: true,
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'Sync with your Notion workspace',
      connected: false,
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Connect Integrations
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
            <Dialog.Title className="text-xl font-bold mb-4">
              Available Integrations
            </Dialog.Title>

            <div className="space-y-4">
              {integrations.map((integration) => (
                <div
                  key={integration.id}
                  className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="mr-3">
                    {integrationIcons[integration.id as keyof typeof integrationIcons]}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{integration.name}</h3>
                    <p className="text-sm text-gray-500">
                      {integration.description}
                    </p>
                  </div>
                  <button
                    className={`px-3 py-1 rounded text-sm ${
                      integration.connected
                        ? 'bg-gray-200 text-gray-700'
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  >
                    {integration.connected ? 'Connected' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
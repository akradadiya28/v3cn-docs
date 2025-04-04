'use client';

import { Step, Steps } from '@/components/ui/steps';

import { CodeBlock } from '@/components/ui/code-block';
import { CodeSnippet } from '@/components/ui/code-snippet';
import { PackageManagerTabs } from '@/components/ui/package-manager-tabs';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface TabOption {
  id: 'cli' | 'manual';
  label: string;
}

interface InstallationTabsProps {
  layoutIdPrefix: string;
  cliCommand: string;
  codeHtml: string;
  cnHtml: string;
  nextConfigHtml: string;
  importCode: string;
  shadcnCommand: string;
}

export function InstallationTabs({
  layoutIdPrefix,
  cliCommand,
  codeHtml,
  cnHtml,
  nextConfigHtml,
  importCode,
  shadcnCommand,
}: InstallationTabsProps) {
  const [selected, setSelected] = useState<TabOption['id']>('cli');
  const [activeStep, setActiveStep] = useState(1);

  const options: TabOption[] = [
    { id: 'cli', label: 'CLI' },
    { id: 'manual', label: 'Manual' },
  ];

  return (
    <div className="space-y-4 px-2">
      {/* Tab buttons */}
      <div className="relative flex border-b border-gray-100 dark:border-zinc-700/50 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gray-100 dark:after:bg-zinc-700/50">
        {options.map(option => (
          <button
            key={option.id}
            onClick={() => {
              setSelected(option.id);
              setActiveStep(1);
            }}
            className={`relative pb-2 text-sm px-4 ${
              selected === option.id
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground/80 transition-all duration-300'
            }`}
          >
            {option.label}
            {selected === option.id && (
              <motion.div
                layoutId={`${layoutIdPrefix}-installation-tab`}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground z-10"
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="md:p-4">
        {selected === 'cli' ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl  text-gray-400 font-light">V3CN</h3>
              <PackageManagerTabs
                command={cliCommand}
                variant="dlx"
                layoutId={`${layoutIdPrefix}-package-manager`}
              />
            </div>

            <div className="flex flex-col gap-4 text-gray-400">
              <h3 className="text-2xl font-light">Shadcn</h3>
              <PackageManagerTabs
                command={shadcnCommand}
                variant="dlx"
                layoutId={`${layoutIdPrefix}-package-manager-shadcn`}
              />
            </div>
          </div>
        ) : (
          <Steps>
            <Step
              step={1}
              title="Install Dependencies"
              description="Install the required dependencies"
              isCompleted={activeStep > 1}
              isActive={activeStep === 1}
              onClick={() => setActiveStep(1)}
            >
              <PackageManagerTabs
                command=" @radix-ui/react-progress"
                variant="add"
                layoutId={`${layoutIdPrefix}-package-manager`}
              />
            </Step>

            <Step
              step={2}
              title="Create a `cn.ts` File in the `utils` Folder"
              description="Add the following code to the newly created file."
              isCompleted={activeStep > 2}
              isActive={activeStep === 2}
              onClick={() => setActiveStep(2)}
            >
              <CodeBlock html={cnHtml} maxHeight={100} expandedHeight={200} />
            </Step>

            <Step
              step={3}
              title="Update next.config.ts Configuration"
              description="Add the specified code snippet to your next.config.ts file for necessary configurations."
              isCompleted={activeStep > 3}
              isActive={activeStep === 3}
              onClick={() => setActiveStep(3)}
            >
              <CodeBlock html={nextConfigHtml} maxHeight={300} expandedHeight={500} />
            </Step>

            <Step
              step={4}
              title="Add Component Code"
              description="Copy and paste the following code into your project"
              isCompleted={activeStep > 4}
              isActive={activeStep === 4}
              onClick={() => setActiveStep(4)}
            >
              <CodeBlock html={codeHtml} maxHeight={300} expandedHeight={500} />
            </Step>

            <Step
              step={5}
              title="Ready to Use"
              description="You can now use the Discord component in your project"
              isCompleted={activeStep > 5}
              isActive={activeStep === 5}
              onClick={() => setActiveStep(5)}
            >
              <div className="text-sm text-muted-foreground">
                Import and use the Discord component in your project:
                <CodeSnippet
                  code={importCode}
                  layoutId={`${layoutIdPrefix}-import-code`}
                  className="mt-2"
                />
              </div>
            </Step>
          </Steps>
        )}
      </div>
    </div>
  );
}

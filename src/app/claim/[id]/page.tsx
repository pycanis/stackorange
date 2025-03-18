import { Bitcoin, Layers, Lightbulb, Wallet } from "lucide-react";
import { Claim } from "../../../containers/Claim";
import { WalletLink } from "./WalletLink";

export const dynamic = "force-static";

export default async function OrangePillPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  return (
    <div>
      <h1 className="text-center font-bold text-4xl mb-2">
        Ready to take the <span className="text-orange">orange</span> pill?
      </h1>

      <p className="text-center text-white-muted text-xl mb-8">Once you understand Bitcoin, there's no going back.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 items-start sm:gap-4">
        <div>
          <div className="bg-white-muted/10 rounded-lg border border-white-muted/50 px-2 py-4 mb-4">
            <div className="mb-4">
              <div className="flex items-center">
                <Bitcoin className="text-orange mr-2" />
                <p className="font-bold text-2xl">What is Bitcoin?</p>
              </div>

              <p className="text-white-muted">A brief introduction to digital gold</p>
            </div>

            <p className="mb-2">
              <span className="font-bold">Bitcoin</span> is digital money that works without third parties like banks.
              It lets people send money directly to each other from anywhere in the world. It's fast and cheap.
            </p>

            <p className="mb-2">
              <span className="font-bold">Satoshis (sats)</span> are the smallest unit of Bitcoin. 1 bitcoin =
              100,000,000 sats.
            </p>

            <p>
              The <span className="font-bold">Lightning Network</span> enables instant, low-cost Bitcoin transactions -
              perfect for small amounts like the sats you're about to claim!
            </p>
          </div>

          <div className="bg-white-muted/10 rounded-lg border border-white-muted/50 px-2 py-4 mb-4">
            <div className="mb-4">
              <div className="flex items-center">
                <Wallet className="text-orange mr-2" />
                <p className="font-bold text-2xl">Get a Lightning wallet</p>
              </div>

              <p className="text-white-muted">Download a wallet app</p>
            </div>

            <p className="mb-2">The most popular ones are the following:</p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <WalletLink description="Simple, non-custodial" link="https://phoenix.acinq.co" name="Phoenix" />

              <WalletLink
                description="Beginner-friendly, custodial"
                link="https://walletofsatoshi.com"
                name="Wallet of Satoshi"
              />

              <WalletLink description="Advanced features" link="https://zeusln.com" name="Zeus" />

              <WalletLink description="Simple recovery" link="https://muun.com" name="Muun" />
            </div>

            <div className="bg-background rounded-lg border border-white-muted/50 p-2 text-sm">
              If you're new to Bitcoin, we recommend using <span className="font-bold">Wallet of Satoshi</span> for
              simplicity and ease of use.
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white-muted/10 rounded-lg border border-white-muted/50 px-2 py-4 mb-4">
            <div className="mb-4">
              <div className="flex items-center">
                <Layers className="text-orange mr-2" />
                <p className="font-bold text-2xl">Claim your sats</p>
              </div>

              <p className="text-white-muted">Scan this QR code with your Lightning wallet</p>
            </div>

            <Claim id={params.id} />
          </div>

          <div className="bg-white-muted/10 rounded-lg border border-white-muted/50 px-2 py-4 mb-4">
            <div className="mb-4">
              <div className="flex items-center">
                <Lightbulb className="text-orange mr-2" />
                <p className="font-bold text-2xl">What can you do with sats?</p>
              </div>

              <p className="text-white-muted">Ideas for using your bitcoin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

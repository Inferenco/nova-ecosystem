import { GlassCard } from "@/components/ui";

export function TermsPage() {
  return (
    <GlassCard as="section" className="mx-auto grid max-w-3xl gap-nova-lg">
      <h1 className="text-h1 text-text-primary">Terms of Service for Nova Wallet</h1>
      <p className="text-caption text-text-muted">
        <strong>Effective Date:</strong> February 23, 2026
      </p>

      <p className="text-body text-text-secondary">
        Please read these Terms of Service ("Terms") carefully before using Nova
        Wallet ("the App", "we", "our", or "us"). By accessing or using the
        App, you agree to be bound by these Terms.
      </p>

      <h2 className="text-h2 text-text-primary">1. Nature of the Service</h2>
      <p className="text-body text-text-secondary">
        Nova Wallet is a <strong>non-custodial, self-custody cryptocurrency wallet</strong>.
        This means:
      </p>
      <ul className="list-disc space-y-nova-sm pl-nova-xl text-body text-text-secondary">
        <li>
          You are solely responsible for the security and management of your
          private keys, seed phrases, and passwords.
        </li>
        <li>We do not store, have access to, or control your private keys or funds.</li>
        <li>
          We cannot freeze, modify, or recover your account or assets under any
          circumstances.
        </li>
        <li>
          If you lose your seed phrase or private keys, your funds will be
          permanently inaccessible. We cannot help you recover them.
        </li>
      </ul>

      <h2 className="text-h2 text-text-primary">2. Eligibility</h2>
      <p className="text-body text-text-secondary">
        By using Nova Wallet, you represent and warrant that:
      </p>
      <ul className="list-disc space-y-nova-sm pl-nova-xl text-body text-text-secondary">
        <li>You are at least 18 years old or the age of majority in your jurisdiction.</li>
        <li>You have the legal capacity to enter into these Terms.</li>
        <li>
          You are not located in, or a citizen or resident of, any jurisdiction
          where the use of cryptocurrency wallets is prohibited or restricted by law.
        </li>
        <li>You will comply with all applicable laws and regulations in your jurisdiction.</li>
      </ul>

      <h2 className="text-h2 text-text-primary">3. User Responsibilities</h2>
      <p className="text-body text-text-secondary">You acknowledge and agree that:</p>
      <ul className="list-disc space-y-nova-sm pl-nova-xl text-body text-text-secondary">
        <li>
          You are solely responsible for safeguarding your seed phrase, private
          keys, and any passwords associated with your wallet.
        </li>
        <li>You will not share your private keys or seed phrase with anyone.</li>
        <li>You will maintain secure backups of your recovery information in a safe location.</li>
        <li>You understand the risks associated with blockchain technology and digital assets.</li>
        <li>
          All transactions initiated through the App are irreversible once
          confirmed on the blockchain.
        </li>
      </ul>

      <h2 className="text-h2 text-text-primary">4. Risks and Disclaimers</h2>
      <p className="text-body text-text-secondary">You acknowledge and accept the following risks:</p>
      <ul className="list-disc space-y-nova-sm pl-nova-xl text-body text-text-secondary">
        <li>
          <strong>Volatility:</strong> Cryptocurrency values can fluctuate
          significantly. You may lose some or all of your investment.
        </li>
        <li>
          <strong>Technical Risks:</strong> Blockchain networks may experience
          congestion, bugs, forks, or other technical issues that could affect
          your transactions or assets.
        </li>
        <li>
          <strong>Security Risks:</strong> Despite our security measures, no
          system is completely secure. You are responsible for the security of
          your device and credentials.
        </li>
        <li>
          <strong>Regulatory Risks:</strong> Laws and regulations regarding
          cryptocurrencies vary by jurisdiction and may change. You are
          responsible for compliance with applicable laws.
        </li>
        <li>
          <strong>Third-Party Risks:</strong> Interactions with decentralized
          applications (dApps), smart contracts, or third-party services through
          the App are at your own risk.
        </li>
      </ul>

      <h2 className="text-h2 text-text-primary">5. Prohibited Uses</h2>
      <p className="text-body text-text-secondary">You agree not to use the App for:</p>
      <ul className="list-disc space-y-nova-sm pl-nova-xl text-body text-text-secondary">
        <li>Any illegal activities, including money laundering, terrorist financing, or fraud.</li>
        <li>Circumventing any sanctions or export controls.</li>
        <li>Interfering with or disrupting the App or its underlying infrastructure.</li>
        <li>Attempting to gain unauthorized access to other users&apos; wallets or data.</li>
        <li>Any activity that violates the rights of others.</li>
      </ul>

      <h2 className="text-h2 text-text-primary">6. In-App Games</h2>
      <p className="text-body text-text-secondary">
        Nova Wallet includes integrated on-chain games, including poker and other
        games. You acknowledge that:
      </p>
      <ul className="list-disc space-y-nova-sm pl-nova-xl text-body text-text-secondary">
        <li>
          All gambling features are <strong>simulated and free to play</strong>.
        </li>
        <li>No real money or cryptocurrency is wagered in these games.</li>
        <li>Game outcomes are for entertainment purposes only.</li>
      </ul>

      <h2 className="text-h2 text-text-primary">7. Intellectual Property</h2>
      <p className="text-body text-text-secondary">
        The App, including its design, logos, text, graphics, and software, is
        owned by us and protected by intellectual property laws. You may not
        copy, modify, distribute, or create derivative works without our prior
        written consent.
      </p>

      <h2 className="text-h2 text-text-primary">8. Limitation of Liability</h2>
      <p className="text-body text-text-secondary">To the maximum extent permitted by law:</p>
      <ul className="list-disc space-y-nova-sm pl-nova-xl text-body text-text-secondary">
        <li>The App is provided "AS IS" and "AS AVAILABLE" without warranties of any kind.</li>
        <li>
          We disclaim all warranties, express or implied, including
          merchantability, fitness for a particular purpose, and non-infringement.
        </li>
        <li>
          We are not liable for any direct, indirect, incidental, special,
          consequential, or punitive damages arising from your use of the App.
        </li>
        <li>
          We are not responsible for any loss of funds, data, or profits, whether
          or not we were advised of the possibility of such damages.
        </li>
        <li>
          Our total liability shall not exceed the amount you paid us (if any) in
          the twelve months preceding the claim.
        </li>
      </ul>

      <h2 className="text-h2 text-text-primary">9. Indemnification</h2>
      <p className="text-body text-text-secondary">
        You agree to indemnify and hold harmless Nova Wallet, its affiliates,
        officers, directors, employees, and agents from any claims, damages,
        losses, or expenses (including legal fees) arising from your use of the
        App, your violation of these Terms, or your violation of any rights of a
        third party.
      </p>

      <h2 className="text-h2 text-text-primary">10. Third-Party Services</h2>
      <p className="text-body text-text-secondary">
        The App may integrate with or link to third-party services, dApps, or
        websites. We do not control and are not responsible for the content,
        privacy policies, or practices of any third-party services. Your use of
        third-party services is at your own risk and subject to their respective
        terms.
      </p>

      <h2 className="text-h2 text-text-primary">11. Modifications to the Service</h2>
      <p className="text-body text-text-secondary">
        We reserve the right to modify, suspend, or discontinue the App (or any
        part thereof) at any time without notice. We shall not be liable to you
        or any third party for any modification, suspension, or discontinuation
        of the App.
      </p>

      <h2 className="text-h2 text-text-primary">12. Changes to These Terms</h2>
      <p className="text-body text-text-secondary">
        We may update these Terms from time to time. We will notify you of
        material changes by posting the updated Terms in the App or on our
        website. Your continued use of the App after such changes constitutes
        acceptance of the new Terms.
      </p>

      <h2 className="text-h2 text-text-primary">13. Governing Law</h2>
      <p className="text-body text-text-secondary">
        These Terms shall be governed by and construed in accordance with the
        laws of the jurisdiction in which we operate, without regard to conflict
        of law principles.
      </p>

      <h2 className="text-h2 text-text-primary">14. Severability</h2>
      <p className="text-body text-text-secondary">
        If any provision of these Terms is found to be unenforceable or invalid,
        that provision shall be limited or eliminated to the minimum extent
        necessary, and the remaining provisions shall remain in full force and effect.
      </p>

      <h2 className="text-h2 text-text-primary">15. Contact Us</h2>
      <p className="text-body text-text-secondary">
        If you have any questions about these Terms of Service, please contact us at
        <a
          href="mailto:singularityshift@inferenco.com"
          className="ml-1 text-nova-cyan hover:underline"
        >
          singularityshift@inferenco.com
        </a>
        .
      </p>
    </GlassCard>
  );
}

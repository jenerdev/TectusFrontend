import { useBEM } from '@tectus/hooks';
import './terms-and-condition-page.scss';
import { Container, Header } from '@/app/components';
import { UiTypography } from '@tectus/ui';

export default function TermsAndConditionPage() {
  const { B, E } = useBEM('terms-and-conditions-page');

  return (
    <div className={B()}>
      <Header center noMenu/>
      <Container>
        <UiTypography variant="h1">Terms and Conditions</UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c1">Security Provider Participation Agreement (Vendor Terms)</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c1">Version 1.0 &mdash; Effective: Aug 22, 2025</span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">
            Tectus Protection, Inc., d/b/a Tectus Protection (&quot;Tectus&quot;)
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c1">Last Updated: 2025-08-22</span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c3">
            These Terms govern security companies and solo providers (Vendors) that accept and
            perform assignments (Jobs) sourced through Tectus. Vendor is an independent contractor
            responsible for its Personnel, compliance, insurance, safety, and results. Tectus
            provides technology and payment services and, for most Jobs, contracts as prime and
            subcontracts to Vendor.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">0) Order of Precedence</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            If there is a conflict, the following order controls: (i) Job-specific terms/insurance
            in the Job details; (ii) these Vendor Terms; (iii) SOPs and End Client site policies.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">1) Acceptance &amp; Electronic Signature</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            By creating an account, clicking &ldquo;I agree,&rdquo; checking a consent box, or
            clicking &ldquo;Accept Job,&rdquo; Vendor is executing these Terms electronically under
            the U.S. Electronic Signatures in Global and National Commerce Act (15 U.S.C. &sect;7001
            et seq.) and applicable state Uniform Electronic Transactions Acts (UETA). Such actions
            constitute Vendor&rsquo;s electronic signature and acceptance with the same force and
            effect as a handwritten signature. If the individual accepting acts on behalf of a
            company, that individual represents and warrants that they have authority to bind the
            company, and acceptance binds the company.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">1A) Versioning; Updates; Ongoing Acceptance</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Each agreement is identified by version number and effective date and is posted within
            the Platform. Tectus may update these Terms from time to time and will post the updated
            version with an updated &#39;Last Updated&#39; date. For material changes, Tectus will
            provide reasonable Notice (e.g., in-app banner, modal, or email) and may require a
            specific click-through acknowledgment before Vendor can accept new Jobs. Vendor
            understands and agrees that (i) continued access to or use of the Platform after the
            effective date of an update, and/or (ii) clicking &#39;Accept Job&#39; after an update
            is posted, constitutes acceptance of the then-current Terms. Vendor is responsible for
            reviewing the current Terms before accepting Jobs. Prior electronic acceptances remain
            valid and govern the version of the Terms in effect at the time each Job was accepted.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">2) Definitions</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            &quot;Vendor&quot;: the company or sole proprietor enrolled on the Platform.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            &quot;Personnel&quot;: Vendor&rsquo;s employees or independent contractors.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            &quot;Platform&quot;: Tectus websites, mobile apps, APIs, and related services.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            &quot;Job&quot;: a specific assignment accepted via the Platform.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">&quot;SOPs&quot;: post orders, site rules, and instructions.</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            &quot;End Client&quot;: the ultimate customer receiving services.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            &quot;Tectus Blackline&quot;: premium secure transport/escort services with distinct fee
            terms.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">&quot;Platform Fee&quot;: the fee stated in Section 13.</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">&quot;Net Terms&quot;: payout timing stated in Section 13.</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            &quot;Quick Pay&quot;: optional accelerated payout per Section 13.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            &quot;Vendor Payout Rate&quot;: the hourly rate payable to Vendor for a given shift as
            shown in the Job details at acceptance (excluding taxes, pass-throughs, and Platform
            Fees).
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            &quot;Gross End Client Charge&quot;: amounts invoiced to the End Client for a Job before
            discounts, excluding taxes, government fees, third-party pass-through expenses, Quick
            Pay fees, card/ACH processing fees, and credits.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            &quot;Service Failure Liquidated Damages Schedule&quot; or &quot;SF Schedule&quot;: the
            pre-posted schedule of liquidated damage amounts applicable to a Job, displayed or
            linked in the &#39;Accept Job&#39; modal at acceptance.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">&quot;MVA&quot;: motor vehicle accident.</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            &quot;A&amp;B&quot;: Assault &amp; Battery coverage within General Liability.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">&quot;HNOA&quot;: Hired &amp; Non-Owned Auto coverage.</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            &quot;DNR&quot;: Do-Not-Return designation barring specified Personnel from future Jobs
            at End Client sites.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">&quot;SAM&quot;: Sexual Abuse or Molestation coverage.</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            &quot;Third-Party Fidelity/Crime (Business Services Bond)&quot;: coverage or bond for
            theft by Vendor&rsquo;s Personnel of End Client money, securities, or tangible property.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">3) Contracting Structure (Prime/Sub; Flow-Down)</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Unless Job details say otherwise, Tectus is the contracting party with Vendor for each
            Job and may separately contract with the End Client; Vendor is Tectus&rsquo;s
            subcontractor for the Job. End Client requirements flow down to Vendor. Vendor will not
            create privity or separate agreements with End Client for substantially similar services
            during the term and 12 months thereafter except through Tectus (see Section 12). If a
            Job is designated as marketplace/agent-only, Section 4 governs payments.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">4) Limited Collection Agent (Marketplace Mode)</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            For any Job explicitly designated as marketplace/agent-only, Tectus acts as limited
            payment collection agent for Vendor, may accept End Client payments, and will remit
            Vendor payouts per Section 13, subject to setoff/holds. Client payment to Tectus
            satisfies Client&rsquo;s obligation to Vendor.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">5) Relationship; No Employment</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor is an independent contractor. Tectus is not a joint employer of Vendor or
            Personnel and does not control methods of work. Vendor bears all wages, taxes, benefits,
            and workers&rsquo; compensation/occupational coverage.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">5A) Background Screening; Fitness</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor will ensure Personnel meet all licensing, screening, and training required by law
            and SOPs, are fit for duty (including drug/alcohol fitness), and maintain records
            available for audit.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c3">&nbsp;</span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">
            5B) Sanctions, Export Controls &amp; Anti-Corruption (Screening &amp; Certification)
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            5B.1 Representations. Vendor represents and warrants that Vendor, its affiliates, any
            direct or indirect owners of &ge;25%, directors, officers, and all Personnel assigned to
            Jobs (collectively, &ldquo;Covered Parties&rdquo;): (a) are not listed on, and are not
            owned or controlled (&ge;50% in aggregate) by one or more persons listed on: (i) U.S.
            Dept. of the Treasury, OFAC Specially Designated Nationals and Blocked Persons (SDN)
            List and OFAC Consolidated Sanctions List (non-SDN lists); (ii) U.S. Dept. of Commerce,
            Bureau of Industry and Security (BIS) Denied Persons List, Entity List, and Unverified
            List; (iii) U.S. Dept. of State, DDTC Debarred Parties List; (iv) United Nations
            Security Council Consolidated Sanctions List; (v) United Kingdom HM Treasury (OFSI)
            Consolidated List; (vi) European Union Consolidated Financial Sanctions List; (vii)
            Government of Canada Consolidated Canadian Autonomous Sanctions List; and (viii)
            Australia DFAT Consolidated List; (b) are not located, organized, or resident in any
            comprehensively sanctioned jurisdiction under U.S. law (including, without limitation,
            Cuba, Iran, North Korea, Syria, and the comprehensively sanctioned regions of Ukraine);
            and (c) will comply with applicable sanctions, export controls, anti-boycott,
            anti-money-laundering/CTF, and anti-corruption laws (including the U.S. FCPA and U.K.
            Bribery Act). 5B.2 Pre-Job Screening &amp; Certification (Condition to Work). Before
            commencing each Job&mdash;and in any event within the 24 hours preceding the Job
            start&mdash;Vendor will screen all Covered Parties against the lists in &sect;5B.1 using
            official government websites or a reputable commercial screening provider. Vendor will
            submit through the Platform a certification that screening was completed, including: (i)
            date/time (UTC); (ii) data used (full legal names, known aliases/DBAs, country, and date
            of birth where available); (iii) lists consulted; and (iv) outcome (no match / possible
            match). 5B.3 Positive or Possible Matches; Holds. Vendor must immediately notify Tectus
            of any positive or possible match and will not commence (or will cease) work unless and
            until Tectus provides written clearance. Tectus may place a hold, suspend access, or
            cancel any Job pending review. 5B.4 Ongoing Monitoring; Changes. Vendor will re-screen
            active Covered Parties at least every 90 days and upon any change in ownership of
            &ge;25% or changes to directors/officers. 5B.5 Records; Audit. Vendor will retain
            evidence of screening (e.g., screenshots or exported reports showing list names and
            timestamps) for five (5) years and provide copies promptly upon request. Tectus may
            conduct independent screening at any time. 5B.6 No Evasion; Restricted Payments. Vendor
            will not route payments through sanctioned financial institutions, use intermediaries to
            evade sanctions, or engage in prohibited end-uses/end-users under U.S. export controls.
            5B.7 Consequences. Failure to certify, incomplete screening, or any breach of this
            Section is grounds for suspension or termination under &sect;20 and subject to
            indemnification under &sect;18.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">5C) Training Matrix</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Tectus may publish minimum credentials by Job type in the Vendor Dashboard. Vendor will
            assign Personnel who meet or exceed those minimums.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">6) Weapons Policy &amp; De-Escalation (Acknowledgment)</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor will ensure Personnel review and comply with Tectus and End Client weapons
            policies and applicable law. No weapon or less-lethal device may be carried unless
            expressly authorized in the Job, lawful, and the Personnel is trained/certified. Duty to
            de-escalate applies. Vendor is solely responsible for selection, training, carriage,
            storage, and lawful use.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">7) Vehicles &amp; Driving</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            For any Job involving driving/escort/transport, Vendor will use qualified, licensed
            drivers, comply with all traffic/DOT laws, prohibit device use while driving, maintain
            Hired &amp; Non-Owned Auto coverage per Section 9, and comply with the Hours-of-Service
            limits in Section 28A(b).
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">8) Incident Reporting &amp; Cooperation</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor will promptly notify Tectus of material safety, security, legal, or claim-related
            events and cooperate in any investigation, insurance adjustment, or legal process. (a)
            Immediate Notice (within 1 hour by phone/portal): any fatality; serious bodily injury;
            any weapon discharge (including less-lethal); physical use of force or restraints;
            arrest/detention; assault/robbery; suspected felony; fire or hazardous condition;
            data/security incident involving End Client or Platform credentials; or any event likely
            to generate media attention or a claim. (b) 24-Hour Written Report: any injury
            (including OSHA-recordable), property damage, motor vehicle accident (MVA), near-miss
            with serious potential, threat/harassment, regulatory inspection/contact at the Job
            site, or complaint that could reasonably lead to a claim. (c) Where SOPs require, Vendor
            will also notify the End Client site contact, but Tectus remains the primary reporting
            recipient. (d) Evidence: preserve scenes, logs, BWC/CCTV, photos, and physical evidence;
            maintain chain of custody; do not alter or delete data; and produce materials to Tectus
            upon request. (e) Statements: Vendor and Personnel will provide factual statements as
            requested by Tectus, insurers, End Client, or authorities but will not admit liability,
            assign fault, or speak on behalf of Tectus. (f) Media/Social: no public or social media
            statements about any Incident without Tectus&rsquo;s written direction, except as
            required by law. This Section operates in tandem with Section 36 (Incident Escalation
            Protocol).
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">8A) Recording Devices; Evidence</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Body-worn or other recordings must comply with law and End Client policy. Vendor will
            preserve chain of custody and produce recordings/logs upon request. No public disclosure
            absent legal obligation.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">8B) Mandatory Reporting to Authorities &amp; Regulators</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            In emergencies or where law requires, Vendor will contact emergency services or public
            authorities immediately in accordance with Section 36. Vendor is responsible for any
            legally required Notices to licensing/regulatory bodies that apply to Vendor&rsquo;s
            business (e.g., guard company licensing agency, law enforcement reporting of weapon
            discharges, mandated abuse/neglect reporting, or OSHA/transport notifications). Unless
            prohibited by law or exigency, Vendor will promptly inform Tectus of any such reports
            and provide copies/receipt numbers. If no legal mandate applies, Vendor will not contact
            authorities or regulators about a Job without Tectus&rsquo;s direction.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2 c4">
          <span className="c3"></span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c1">9) Insurance Requirements (Minimums)</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Maintain the following during participation. For any policy written on a claims-made
            basis (e.g., Professional/E&amp;O, Cyber, and any SAM or Crime policy written on
            claims-made forms), Vendor will either maintain continuous coverage with a retroactive
            date no later than the date Vendor first performs services via the Platform, or purchase
            an Extended Reporting Period (&ldquo;ERP&rdquo;/&ldquo;tail&rdquo;) of not less than
            twenty-four (24) months after the later of (i) the last Job&rsquo;s completion or (ii)
            termination of these Terms. Occurrence-form policies (e.g., CGL, including A&amp;B;
            Hired &amp; Non-Owned Auto; Umbrella/Excess following form; Workers&rsquo; Compensation)
            need not be maintained post-termination; however, Additional Insured&mdash;Completed
            Operations status must be provided per &sect;9B, and evidence of such status (and any
            ERP purchase) will be provided upon request. If an ERP of the stated duration is
            unavailable on commercially reasonable terms, Vendor will notify Tectus in writing and
            maintain continuous claims-made coverage with the same retroactive date for the required
            period.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            (a) CGL (occurrence) $1,000,000 per occurrence / $2,000,000 aggregate, expressly
            covering security services and including A&amp;B (no exclusion) &ge; $250,000 per
            occurrence or within GL limits;
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            (b) Workers&rsquo; Comp as required by law and Employers&rsquo; Liability $500,000 /
            $500,000 / $500,000 (or Occupational Accident reasonably acceptable to Tectus if WC is
            not required by law);
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            (c) Hired &amp; Non-Owned Auto $1,000,000 CSL where any driving/transport may occur;
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            (d) Umbrella/Excess $1,000,000 follow-form (higher if Job requires; Job terms control);
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">(e) Professional/E&amp;O if required by law/Job.</span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">9A) Optional Coverages for Special Exposures (Job-Triggered)</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            These coverages are required only when the Job details flag a special exposure: (i)
            contact with minors or vulnerable persons; or (ii) unsupervised access to End Client
            money, securities, inventory, keys, access cards, or access codes. (a) Sexual Abuse or
            Molestation (SAM): If minors/vulnerable-person contact is flagged, Vendor will either
            (1) maintain SAM coverage (endorsement to GL or standalone) with limits not less than
            USD $100,000 per claim (or higher per Job details) and no SAM exclusion as to
            Vendor&rsquo;s Personnel; or (2) decline such Jobs. (b) Third-Party Fidelity/Crime
            (Business Services Bond acceptable): If unsupervised access to client
            funds/keys/property is flagged, Vendor will maintain either a Third-Party Crime policy
            or a Business Services/Employee Dishonesty bond covering theft by Vendor&rsquo;s
            Personnel with limits not less than USD $100,000 per claim (or higher per Job details).
            End Client and Tectus may be named as loss payees as interests appear. (c) Follow-Form
            Umbrella: Where applicable, Umbrella/Excess must be follow-form. (d) Waiver/Attestation:
            If the Job details do not flag a special exposure, these coverages are not required;
            Vendor may be asked to attest that the Job involves no minors/vulnerable-person contact
            and no unsupervised access to client funds/keys/property.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">9B) Endorsements; Deductibles; Primary/Non-Contributory</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Name Tectus and, where stated in Job details, the End Client as Additional Insureds on a
            primary and non-contributory basis (GL, Auto, Umbrella) with Waiver of Subrogation (GL,
            WC where permitted, Auto, Umbrella). Additional Insured and Primary &amp;
            Non-Contributory wording must be provided via industry-standard endorsements (e.g., CG
            20 10 and CG 20 37 and CG 20 01, or equivalents). Vendor is responsible for
            deductibles/SIRs. Umbrella follows form including A&amp;B and HNOA. Blanket Additional
            Insured and Primary &amp; Non-Contributory endorsements that apply to any written
            contract requiring such status will satisfy this Section.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">9C) Certificates; Notice; Insurance Monitoring</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Provide COIs with AI/PNC and WOS endorsements before accepting any Job and upon renewal.
            Provide 30 days&rsquo; prior Notice of cancellation/material change (10 for non-payment)
            where available. Tectus may verify via third-party services and rely on insurer/agent
            confirmations. Failure to cooperate is grounds for suspension.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2 c4">
          <span className="c3"></span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c1">9D) Absolute Insurance Gate (No Coverage, No Work)</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            If required insurance is missing, lapsed, below minimums, lacks required endorsements,
            or fails to maintain any required Extended Reporting Period (ERP) or continuity of
            claims-made retroactive date, Vendor will not accept or perform any Job. Doing so is a
            material breach and grounds for immediate suspension/termination.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">9E) Insurer Qualifications</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            All required insurance must be placed with insurers rated at least A- (VII) by A.M. Best
            (or equivalent) or otherwise reasonably acceptable to Tectus. Where required by law,
            policies must be written by admitted carriers; surplus lines carriers are acceptable
            where permitted.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">10) No Subcontracting</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor will not subcontract, assign, or re-route any Job to any third party other than
            its own Personnel without Tectus&rsquo;s prior written consent. No sub-subcontracting.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">10A) Personnel Classification &amp; Coverage</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor is responsible for classification of Personnel and any wage/hour, tax, benefit,
            or misclassification claims and will defend/indemnify Tectus for such claims.
            Independent contractors must be covered under Vendor&rsquo;s insurance.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">11) Performance; SOPs; Records</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Perform Jobs professionally and lawfully, comply with SOPs and site rules, use Platform
            timekeeping/GPS/check-in when required, and maintain accurate logs and incident reports.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">11A) Right to Remove; DNR</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Tectus or the End Client may require immediate removal/replacement of any Personnel and
            may designate Personnel Do-Not-Return (DNR). Vendor will not assign DNR Personnel to any
            Job.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">
            11B) Service Failure Fee (Liquidated Damages; Pre-Posted Schedule)
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span>
            11B.1 Purpose. The parties agree that certain failures cause urgent replacement,
            dispatch, escalation, and client recovery costs that are difficult to calculate at the
            time of contracting. The following amounts are a reasonable pre-estimate of those costs
            and are agreed as liquidated damages, not a penalty. 11B.2 When and How Posted. The
            Service Failure Liquidated Damages Schedule (the &ldquo;SF Schedule&rdquo;) for each Job
            will be (a) posted in the Vendor Dashboard and (b) displayed or linked in the
            &#39;Accept Job&#39; modal with a version identifier before Vendor accepts the Job. The
            SF Schedule version displayed at acceptance is incorporated into, and governs, that Job
            and will not change retroactively. 11B.3 Amounts (Default Schedule). If, for any reason,
            an SF Schedule is not displayed or linked in the &#39;Accept Job&#39; modal for a Job,
            the following default amounts apply to that Job:{' '}
          </span>
          <span>
            (a) No-Show or Abandonment of Post: liquidated damages equal to the lesser of (1) four
            (4) hours at the Vendor Payout Rate plus USD $150, or (2) the Vendor Payout that would
            have been earned for the affected shift.{' '}
          </span>
          <span className="c3">
            (b) Late Arrival: 31&ndash;60 minutes late = one (1) hour at the Vendor Payout Rate;
            61&ndash;120 minutes late = two (2) hours at the Vendor Payout Rate; more than 120
            minutes late is treated as a No-Show under 11B.3(a). (c) Under-Staffing: for each
            guard-hour unfilled vs. the accepted Job, one (1) hour at the Vendor Payout Rate. (d)
            Early Departure without approval (&gt;15 minutes before shift end): one (1) hour at the
            Vendor Payout Rate. 11B.4 Mitigation; No Double Recovery. Tectus will use commercially
            reasonable efforts to mitigate losses. Amounts under this Section are not in addition to
            any amounts already withheld for the same missed hours (no double recovery). 11B.5
            Setoff. Tectus may offset liquidated damages under this Section against any payouts
            otherwise due to Vendor. 11B.6 Savings Clause. If a court finds any amount herein
            unenforceable as liquidated damages, the parties agree that Tectus may recover its
            actual provable damages for the same failure, and any overbroad term will be reduced to
            the maximum enforceable amount.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">11C) Records Retention</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Retain Job records/logs/incident reports/recordings for at least 5 years (longer if
            required by law or under hold Notice). Preserve upon Tectus&rsquo;s written legal hold.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">11D) Personnel SOP Acknowledgments</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor will ensure Personnel electronically acknowledge site-specific SOPs and safety
            rules in the Platform before each Job. Such acknowledgments constitute electronic
            signatures and are retained as part of the Job record.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2 c4">
          <span className="c3"></span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c1">12) Liquidated Damages (Non-Circumvention)</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            The parties acknowledge that a breach of this Section 12 would cause losses (including
            costs of client acquisition/maintenance, coordination, reputational harm, and lost
            platform economics) that are difficult to quantify at the time of contracting.
            Therefore, as a genuine pre-estimate of harm and not a penalty, the Vendor agrees that,
            upon such breach, Tectus is entitled to liquidated damages equal to the greater of: (a)
            twenty percent (20%) of all gross amounts billed or collected by Vendor (and its
            affiliates) for Covered Services provided to the Introduced Client during the Tail
            Period and the twelve (12) months thereafter (&ldquo;Circumvented Receipts&rdquo;); or
            (b) the Platform Fee that would have applied if the same services had been transacted
            through the Platform, applied to the Circumvented Receipts. Tail Period means the twelve
            (12) months following the later of (i) Vendor&rsquo;s first receipt of the Introduced
            Client&rsquo;s identity or Job details through the Platform, or (ii) Vendor&rsquo;s last
            on-Platform service for that Introduced Client; the Tail Period is tolled during any
            period of concealment or undisclosed circumvention. The applicable percentage(s)/fee(s)
            are disclosed in these Terms and referenced in the &ldquo;Accept Job&rdquo; modal before
            acceptance; they are incorporated into each Job when accepted and will not be changed
            retroactively. Vendor expressly agrees that the foregoing formula and amounts are
            reasonable in light of anticipated harm at the time of agreement and job acceptance. If
            Vendor fails to keep or produce reasonable records of Circumvented Receipts, Tectus may
            compute the liquidated damages using reasonable estimates based on available data
            (including historical rates/hours for that Introduced Client or comparable clients),
            subject to adjustment if Vendor later provides reliable records. If any part of this
            clause is found unenforceable as liquidated damages, Tectus may recover its actual
            provable damages for the same breach, and any overbroad term will be reduced to the
            maximum enforceable extent.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2 c4">
          <span className="c3"></span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c1">12A) Illustrative Examples (Not a Cap or Penalty)</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Example 1 (Single Project): Vendor circumvents and bills an Introduced Client USD
            $100,000 for Covered Services during the Tail Period. Liquidated damages = 20% &times;
            $100,000 = $20,000 (greater than the Platform Fee alternative).
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Example 2 (Multiple Invoices Across Tail + 12 Months): Vendor and its affiliate collect
            $12,000 during the Tail Period and $18,000 in the 12 months thereafter = $30,000 total
            Circumvented Receipts. LD = 20% &times; $30,000 = $6,000.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Example 3 (Platform Fee Alternative Controls): If the applicable Platform Fee for the
            service line is 25% (hypothetical Blackline example) and Circumvented Receipts are
            $40,000, LD = max(20% &times; $40,000 = $8,000; 25% &times; $40,000 = $10,000) &rArr;
            $10,000.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span>
            Example 4 (Missing Records; Estimation): If Vendor fails to produce records, Tectus
            estimates Circumvented Receipts based on prior on-platform work for that Client (e.g.,
            average $65/hour &times; 200 hours = $13,000). LD = 20% &times; $13,000 = $2,600,
            subject to adjustment if Vendor later provides reliable records.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">12B) California Construction (If Applicable)</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            For Vendors subject to California law, this Section 12 is intended and will be construed
            solely to prevent misuse of Tectus Confidential Information, Job details, and
            interference with Tectus&rsquo;s contractual and prospective economic relations, and not
            to restrain lawful competition. Nothing herein prohibits a Vendor from competing or
            servicing a client independently if the Vendor does not use Tectus Confidential
            Information or Job details to do so. To the extent any portion of this Section would be
            deemed a restraint of trade under Cal. Bus. &amp; Prof. Code &sect;16600 et seq., it
            will be reformed to the maximum enforceable extent consistent with this paragraph.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c5">12C) Client Conversion Fee</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            If Vendor wishes to continue providing Covered Services to an Introduced Client
            off-Platform, Vendor may, with Tectus&rsquo;s prior written consent obtained in advance,
            pay a one-time client conversion fee equal to 20% of the projected first-year
            Circumvented Receipts (or 25% for Tectus Blackline or enterprise-designated
            introductions), with a minimum of $7,500 (standard) and $15,000 (Blackline/enterprise).
            Upon payment, Section 12 will not apply to Covered Services rendered to that Introduced
            Client after the effective date of the conversion. This does not waive Vendor&rsquo;s
            obligations for services provided prior to conversion.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">12D) Cure Option</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Within ten (10) business days after written Notice of a breach of this Section 12,
            Vendor may cure by either (a) routing the engagement through the Platform and paying the
            Platform Fee on Circumvented Receipts to date (with prospective use of the Platform
            thereafter), or (b) paying the Client Conversion Fee under Section 12C. Upon timely
            cure, Tectus will waive liquidated damages for the cured conduct, without limiting
            Tectus&rsquo;s right to injunctive relief for ongoing misuse.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">13) Fees, Payouts, Net Terms, Quick Pay, Setoff</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            13.1 Platform Fee (Standard): 4.97% of gross End Client charge (excluding
            taxes/pass-throughs) applies to non-Blackline Jobs; Blackline Platform Fees are as
            posted in the Vendor Dashboard/Job details and may differ. Fees may change prospectively
            with Notice. 13.2 Net Terms: Unless otherwise stated, Net 21 calendar days from (i) Job
            completion (single-shift) or (ii) period close (multi-day/ongoing), subject to End
            Client payment receipt, fraud review, required documentation, and offsets/reserves. 13.3
            Quick Pay (Optional; Subject to Change): Where available, Vendor may elect Net 14 (+1%),
            Net 7 (+2%), or Net 2 (+3%) applied to payout at disbursement. Offerings, eligibility,
            and fees may change prospectively with Notice and may vary by risk, claims, reserve
            status, or Job type (including Blackline). 13.4 Holds/Reserves/Setoff: Tectus may place
            holds/reserves and set off against current/future payouts any amounts owed (chargebacks,
            refunds, penalties for policy violations, deductibles/retentions advanced by Tectus to
            resolve claims attributable to Vendor). 13.5 Documentation &amp; Disputes: Failure to
            provide timekeeping/logs/incident reports may delay or reduce payout. If a charge is
            reversed/refunded due to Vendor non-performance/breach/insufficient documentation,
            Tectus may debit or set off. 13.6 Taxes: Vendor is responsible for its own taxes and
            will provide required tax forms (e.g., W-9).
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">13A) No Advance of Funds</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Except where Vendor has an approved Quick Pay election, Tectus has no obligation to
            advance funds prior to End Client payment receipt.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">14) Client Disputes; Chargebacks</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor will cooperate to resolve disputes with End Clients. Tectus may debit or set off
            amounts for chargebacks or refunds attributable to Vendor&rsquo;s performance.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">15) Confidentiality</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Use Tectus/End Client confidential information only to perform Jobs; protect against
            unauthorized use/disclosure; return or destroy on request.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">15A) Data Security; Security Incidents; Cyber Liability</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            If Vendor handles Personal Data, video, access credentials, or incident data, Vendor
            will implement reasonable administrative, technical, and physical safeguards appropriate
            to the nature of the data and risk. Vendor will maintain Cyber Liability (Network
            Security &amp; Privacy) not less than USD $500,000. &quot;Security Incident&quot; means
            any actual or reasonably suspected unauthorized access to, or acquisition, destruction,
            loss, alteration, or disclosure of Personal Data or systems that store/process it.
            Vendor will notify Tectus of any Security Incident without undue delay and in any case
            within 24 hours after becoming aware, provide regular updates, and cooperate with
            Tectus, insurers, regulators, and End Client as directed. Notification to affected
            individuals, regulators, or media will be coordinated by Tectus unless law expressly
            requires Vendor to notify; in that case, Vendor will (unless legally prohibited) notify
            Tectus in advance and share copies/receipt numbers. Vendor will preserve relevant
            logs/evidence, mitigate harm, and not make public statements without Tectus&rsquo;s
            written direction. Vendor will comply with applicable privacy and data-security laws
            (including state data-breach notification statutes) and any End Client data-processing
            requirements stated in the Job details.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">15B) Privacy Rights Requests (DSRs) &amp; Portal</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            To the extent Tectus or the End Client acts as a controller (or &#39;business&#39;) and
            Vendor processes Personal Data on their behalf, Vendor will: (a) promptly forward to
            Tectus any data subject/consumer request it receives (e.g., access, deletion/&#39;right
            to be forgotten&#39;, correction, portability, opt-out of sale/sharing/targeted ads) and
            will not respond except as instructed by Tectus; (b) provide reasonable assistance and
            all relevant data needed by Tectus to respond, within five (5) calendar days of request
            (or sooner if needed to meet legal deadlines); and (c) implement Tectus&rsquo;s written
            instructions to correct, restrict, delete, or return Personal Data, subject to permitted
            retention exceptions. Tectus will maintain a Privacy Requests Portal or other channel
            posted on the Platform legal page for request intake. If Vendor independently acts as a
            controller for Personal Data it collects outside of the Platform, Vendor will honor
            requests it receives directly in accordance with applicable law.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">15C) Data Minimization; Retention &amp; Deletion</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor will collect only the Personal Data necessary to perform a Job and will not
            retain it longer than needed for that purpose, except as required by law, insurance, or
            legitimate defense of claims. Where Tectus instructs deletion in connection with a
            verified privacy request, Vendor will delete or de-identify the data and confirm
            completion, except where retention is required under Section 11C (records retention),
            legal hold, insurance, tax, or other statutory obligations; in those cases, Vendor will
            sequester, restrict access, and delete when the basis for retention ends. Backups must
            be overwritten in the ordinary course on the next scheduled cycle.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">15D) Role of Parties; Service Provider/Sub-Processor Terms</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            For Personal Data that Vendor processes on behalf of Tectus or the End Client: (a)
            Vendor acts as a service provider/processor (and sub-processor where Tectus is a service
            provider/processor) and will process Personal Data only on documented instructions from
            Tectus (including Job details and SOPs); (b) Vendor will not sell or share Personal
            Data, use it for targeted advertising, combine it with data from other clients except
            for fraud/security or service improvement permitted by law, or use it for any purpose
            other than performing Jobs; (c) Vendor will impose written confidentiality and
            data-protection obligations on Personnel and any approved subcontractors consistent with
            this Agreement; and (d) upon termination of a Job or this Agreement, Vendor will return
            or delete Personal Data per Tectus&rsquo;s instructions, subject to Section 15C
            exceptions.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">16) Intellectual Property; Marks; Publicity</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            The Platform and all Tectus IP belong to Tectus or its licensors. Tectus grants a
            limited, revocable license to use the Platform to receive/perform Jobs. No use of
            Tectus&rsquo;s name or marks without written approval. Vendor authorizes Tectus to list
            Vendor&rsquo;s name/logo as a participating provider; Vendor may opt out by written
            Notice.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">17) Safety; No Warranties</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor is solely responsible for safety of operations and Personnel. THE PLATFORM IS
            PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES. TECTUS DOES NOT WARRANT OUTCOMES OR
            THIRD-PARTY CONDUCT.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">18) Indemnification (Vendor &rarr; Tectus)</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor will defend, indemnify, and hold harmless Tectus, its affiliates, and their
            officers/directors/employees/agents from any claims, losses, damages, costs, and
            expenses (including reasonable attorneys&rsquo; fees) arising from: (a) acts/omissions
            of Vendor/Personnel; (b) injury/death/property damage related to services; (c) legal
            non-compliance (licenses, weapons, SOPs); (d) employment/wage/hour/benefit or worker
            classification claims; (e) IP/right violations by Vendor; or (f) Vendor&rsquo;s breach.
            Indemnity is not limited by insurance availability.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">19) Limitation of Liability (Tectus &rarr; Vendor)</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            To the maximum extent permitted by law, Tectus is not liable for indirect, incidental,
            consequential, exemplary, punitive damages, lost profits, goodwill, or data.
            Tectus&rsquo;s total liability will not exceed the greater of (a) Platform Fees paid by
            Vendor in the 12 months prior to the event or (b) $5,000. This does not limit liability
            where prohibited by law for Tectus&rsquo;s own willful misconduct or fraud.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">20) Suspension; Termination for Cause</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Tectus may suspend/terminate immediately for safety, compliance, insurance failure,
            fraud, or material breach. Termination does not relieve pre-existing obligations.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">20A) Termination for Convenience</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span>
            Tectus may terminate Vendor&rsquo;s participation on 15 calendar days&rsquo; Notice.
            Accrued payment obligations survive subject to offsets and End Client payment
            receipt.{' '}
          </span>
          <span className="c3">
            Vendor may terminate these Terms for convenience on 15 calendar days&rsquo; Notice. For
            clarity, termination (by either party) does not affect Jobs already accepted; Vendor
            must complete accepted Jobs through their scheduled end unless Tectus releases Vendor in
            writing.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">20B) Change of Control; Re-Verification</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor will notify Tectus in writing within 10 calendar days of any change of control,
            key ownership, or executive leadership that could affect licensing, insurance, or
            compliance. Tectus may suspend access pending re-verification.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">21) Audits; Verification</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            On reasonable Notice, Tectus may audit licenses, training, insurance, timekeeping, logs,
            and incident files and request copies or on-screen review. Failure to cooperate may
            result in suspension.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">21A) Return of Property &amp; Access</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Upon request or Job end, Vendor will promptly return all Tectus/End Client property
            (badges, keys, access cards, devices, documents, data) and delete digital
            access/credentials (except records retained under Section 11C).
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">22) Dispute Resolution; Class Waiver; Jury Waiver</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            GOVERNING LAW: Delaware law (conflict rules excluded). ARBITRATION: This arbitration
            agreement is governed by the Federal Arbitration Act (9 U.S.C. &sect; 1 et seq.) and not
            state arbitration law. Any dispute will be resolved by binding arbitration administered
            by the American Arbitration Association under its Commercial Rules. VENUE/SEAT: Denver,
            CO (or video at the arbitrator&#39;s discretion). CLASS WAIVER: Disputes will be
            resolved only on an individual basis. JURY WAIVER: If a dispute is found non-arbitrable,
            both parties waive jury trial.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">22A) Equitable Relief</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Either party may seek temporary/preliminary injunctive relief in court to protect
            Confidential Information, IP, or enforce Section 12 (Non-Circumvention) without waiving
            arbitration for damages.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">22B) Delegation; Representative Actions; Severability</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            The arbitrator shall have exclusive authority to resolve any dispute relating to the
            interpretation, applicability, enforceability, formation, or scope of this arbitration
            agreement, including any claim that all or part of this agreement is void or voidable
            (delegation clause). To the fullest extent permitted by law, the parties waive any right
            to bring or participate in class, collective, private attorney general, or
            representative actions. If any waiver in this Section is found unenforceable as to a
            particular claim type, that claim will be litigated in a court of competent jurisdiction
            (as permitted by law), while any remaining claims proceed in individual arbitration.
            This Section is severable from the rest of the Terms.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">23) Notices (Defined Term; Methods; Deemed Receipt)</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            23.1 Defined Term. &quot;Notice&quot; means a written communication delivered by one of
            the permitted methods in &sect;23.2, addressed as in &sect;23.3, and concerning rights
            or obligations under these Terms (e.g., breach, termination, audits, insurance changes,
            force majeure, changes to Terms). Operational notifications (e.g., in-app banners about
            product features) are not a Notice unless expressly stated to be a Notice under this
            Section. 23.2 Permitted Methods. (a) Email to the addresses in the recipient&rsquo;s
            Vendor profile (primary and legal contacts) and/or the legal Notice email posted on the
            Platform legal page; (b) reputable overnight courier with tracking; (c) certified or
            registered mail (return receipt requested); and (d) Platform message or portal message
            that is clearly labeled as a &quot;Notice&quot; and links to the full text. SMS may be
            used for operational purposes but is not a Notice unless the message expressly states it
            is a &quot;Notice&quot; under this Section. 23.3 Addresses; Updates. Each party will
            keep its contact details current in the Platform. Changes to Notice addresses are
            effective when updated in the Vendor profile or acknowledged in writing by Tectus. 23.4
            Deemed Receipt. Email: upon successful transmission without bounce, or the next business
            day if sent after 5:00 p.m. at the recipient&rsquo;s principal place of business.
            Courier: upon delivery as shown by carrier records. Certified/registered mail: on the
            earlier of actual receipt or three (3) business days after mailing. Platform-labeled
            Notices: when posted to the recipient&rsquo;s account and either (i) first access
            thereafter or (ii) two (2) business days after posting, whichever occurs first.
            &quot;Business day&quot; means Monday&ndash;Friday excluding federal holidays in the
            recipient&rsquo;s principal place of business. 23.5 Carve-Outs. Service of process for
            temporary/preliminary injunctive relief and arbitration papers may be made by email
            under &sect;23B. This Section does not constitute consent to email service of a civil
            action on the merits. 23.6 No Waiver by Informal Communications. Emails, chats, or
            in-app messages that are not a Notice under this Section do not satisfy any requirement
            to provide Notice, unless expressly labeled as a &quot;Notice&quot; and sent by a
            permitted method.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">23A) Electronic Communications, Records, and E-Sign Consent</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor consents to receive contracts, Notices, disclosures, and records electronically
            and agrees that click-through acceptances, electronic signatures, and Platform Notices
            constitute writings and effective Notice under applicable law (including ESIGN and
            UETA). Hardware/Software: Vendor must maintain a device with a modern web browser,
            internet access, and the ability to view and save PDFs. Paper Copies/Withdrawal: Vendor
            may request a paper copy or withdraw e-sign consent by emailing the legal Notice address
            on the Platform; withdrawal may result in suspension of Platform access and will not
            affect the legal validity of prior electronic records or signatures.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">
            23B) Service of Process by Email (Temp/Prelim Injunctive Relief &amp; Arbitration Only)
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Scope. To the extent permitted by applicable law and by the rules or orders of the
            administering tribunal, the parties consent to service by email of: (i) applications,
            motions, and supporting papers for temporary restraining orders and/or preliminary
            injunctive relief; and (ii) arbitration demands, Notices, orders, awards, and related
            filings (collectively, &quot;Covered Papers&quot;). Method. Covered Papers may be served
            by sending a PDF copy to (a) the email addresses listed in the recipient&#39;s Vendor
            profile (primary and legal contacts), and (b) the legal Notice email posted on the
            Platform legal page, unless the administering arbitral institution or court requires a
            different method, or by any additional method the administering tribunal orders or
            permits. Effectiveness. Email service is deemed effective upon successful transmission
            without bounce, or on the next business day if sent after 5:00 p.m. at the
            recipient&#39;s principal place of business. &quot;Business day&quot; means
            Monday&ndash;Friday excluding federal holidays in the recipient&#39;s principal place of
            business. If file size limits prevent delivery, service is effective when a download
            link to the Covered Papers (and a short Notice identifying them) is successfully
            transmitted without bounce. Evidence. Server logs and Platform logs showing successful
            transmission are prima facie evidence of service. Backup Copy (Courtesy). As a courtesy
            (not a condition of effectiveness), the sender will dispatch a hard copy by reputable
            overnight courier within two (2) business days. Recipient Duties. Each party must
            maintain current Notice emails under Section 23, monitor spam filters, and promptly
            update contact details; failure to do so will not invalidate service properly sent to
            the last provided addresses. No General Consent. This Section does not constitute
            consent to email service for initiation of a civil action on the merits in court;
            ordinary service rules apply unless otherwise agreed or ordered. International Matters.
            This Section does not waive rights or obligations under the Hague Service Convention or
            similar treaties; email service outside the United States is permitted only to the
            extent allowed by applicable law or tribunal order. Government/Regulatory. Nothing
            herein limits service by or to government agencies where a specific method is prescribed
            by law. Confirmation. Upon request, the recipient will acknowledge receipt by reply
            email within one (1) business day; lack of acknowledgment does not invalidate otherwise
            effective service.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">
            23C) Job-Level Electronic Signatures; Acceptance of Current Terms
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Each click on &#39;Accept Job,&#39; shift confirmation, timeclock action, or in-app
            acknowledgment of SOPs constitutes Vendor&rsquo;s and/or Personnel&rsquo;s electronic
            signature on the Job-specific terms and an affirmation that Vendor accepts the
            then-current Vendor Terms identified in the modal (showing version and last-updated
            date). The &#39;Accept Job&#39; UI will state that clicking constitutes acceptance of
            the current Vendor Terms; Vendor agrees it is responsible for reviewing updates prior to
            acceptance.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">23D) Counterparts; Originals; Admissibility</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Electronic copies, click-through logs, and PDF exports are deemed originals and are
            admissible to the same extent as wet-ink signatures. The parties waive any objection to
            the authenticity of electronic records solely because they are in electronic form.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">23E) Authorized Representative</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor represents that any user who accepts on Vendor&rsquo;s behalf is an authorized
            representative with authority to bind Vendor, and Vendor is responsible for managing
            user access, roles, and credentials.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">23F) Acceptance Audit Trail</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Tectus may maintain acceptance logs (including timestamp, user ID, IP address, device/UA
            fingerprint, and agreement version/hash). Vendor agrees such records are prima facie
            evidence of acceptance.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">23G) Copies to Personnel (Read-Only)</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Tectus may display read-only copies of the Terms and applicable SOPs to Vendor&rsquo;s
            Personnel for review and acknowledgment. Vendor remains responsible for Personnel
            compliance.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">24) Changes to Terms</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Tectus may modify these Terms from time to time. Updates take effect on the stated
            effective date when posted in the Platform with an updated version and &#39;Last
            Updated&#39; date. For material changes, Tectus will provide reasonable advance Notice
            where practicable (e.g., in-app banner, modal, email) and may require a specific
            click-through acknowledgment before Vendor can accept new Jobs. Continued access to or
            use of the Platform on or after the effective date, or clicking &#39;Accept Job&#39;
            after an update is posted, constitutes acceptance of the updated Terms. If Vendor does
            not agree to an update, Vendor must stop using the Platform and not accept further Jobs.
            Changes to the dispute resolution provisions will apply only prospectively and will not
            affect disputes that have already accrued when the change takes effect.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">25) General</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Entire agreement; severability; no waiver unless in writing; assignment by Vendor
            requires consent; Tectus may assign to affiliates or in connection with merger/sale. No
            third-party beneficiaries except as expressly stated (Additional Insureds/End Client
            insurance rights).
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">25A) Force Majeure (Including Public Health Emergencies)</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Neither party is liable for delay or failure to perform (other than payment obligations
            already accrued) to the extent caused by a Force Majeure Event beyond its reasonable
            control, including: acts of God (e.g., flood, wildfire, hurricane, earthquake), epidemic
            or pandemic (including COVID-19 or similar), declared public-health emergency,
            quarantine or shelter-in-place order, widespread communicable disease outbreak, war,
            terrorism, civil unrest, riots, embargoes, changes in law or government orders, national
            or regional utility/telecom/Internet outages, cyberattacks not caused by the affected
            party&rsquo;s failure to maintain reasonable security safeguards, or supply-chain
            failures directly attributable to any of the foregoing. The affected party must (a)
            provide prompt written Notice (and in any event within 48 hours after becoming aware)
            identifying the event and expected impact, (b) use diligent efforts to mitigate and
            implement commercially reasonable workarounds (including alternate personnel/providers
            or remote performance where lawful), and (c) resume performance as soon as practicable.
            Force Majeure does not include: lack of funds; general labor shortages; or strikes,
            lockouts, or other labor disputes limited to the affected party&rsquo;s own workforce or
            subcontractors. If Vendor is affected, Tectus may reassign or cancel impacted Jobs
            without liability. If a Force Majeure Event continues for more than 15 consecutive days,
            Tectus may terminate the affected Job(s) or this Agreement for convenience on written
            Notice. Payment obligations for services actually performed and approved before the
            Force Majeure Event remain due in accordance with Section 13, subject to setoff/holds.
            Confidentiality, data security, insurance maintenance, non-circumvention, audit/records,
            and dispute-resolution provisions continue to apply during any Force Majeure Event.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">25B) Severability &amp; Judicial Reformation</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            If any provision of these Terms is held invalid or unenforceable, the remaining
            provisions remain in full force and effect. The invalid or unenforceable provision will
            be modified and enforced to the maximum extent permitted by law to effect the
            parties&rsquo; original intent (judicial reformation/blue-penciling). Without limiting
            the foregoing, the parties request that any overbroad time, scope, or liquidated damages
            terms be reduced to the maximum enforceable extent rather than voided.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">26) Headings; Interpretation</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Headings are for convenience only and do not affect interpretation.
            &quot;Including&quot; means &quot;including without limitation&quot;.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">27) Labor, EEO, Anti-Harassment</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor will comply with all labor, equal opportunity, and anti-harassment laws/policies
            applicable to Personnel on Jobs.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">28) Drug, Alcohol &amp; Fitness for Duty (Including Fatigue)</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor will maintain and enforce a drug/alcohol and fitness-for-duty policy consistent
            with law and ensure Personnel are fit to perform Jobs. Personnel may not report to duty
            or remain on duty if impaired by alcohol, controlled substances, medications with
            sedating effects, illness, or fatigue/sleep deprivation. Tectus or the End Client may
            remove any Personnel who present signs of impairment or unsafe fatigue. Vendor will
            implement pre-shift screening (e.g., attestation or supervisor check) to identify
            impairment or fatigue consistent with Section 28A.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">28A) Hours-of-Service (HOS) &amp; Rest Requirements</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            (a) Non-Driving Roles: Unless Job details or law set stricter limits, each Person may
            work no more than: (i) 12 hours in any rolling 24-hour period; (ii) 60 hours in any
            rolling 7-day period; with (iii) at least 10 consecutive hours off between shifts; and
            (iv) a 30-minute rest break for every 6 consecutive hours on duty. (b)
            Driving/Escort/Transport: Regardless of vehicle weight or DOT applicability, when a Job
            involves driving, Personnel may not exceed: (i) 11 hours of driving within a 14-hour
            duty window following 10 consecutive hours off; (ii) a 30-minute break after 8
            cumulative hours of driving; and (iii) 60 hours on duty in 7 days (or 70 in 8 days)
            unless a stricter limit is stated by law or Job details. Where DOT rules legally apply,
            Personnel must comply with DOT HOS and any required logs. (c) Consecutive Days: No more
            than 6 consecutive days without at least 24 consecutive hours off, unless a declared
            emergency is approved in writing by Tectus; in no event may driving exceed applicable
            HOS limits. (d) Observation &amp; Relief: If fatigue is observed or reported mid-shift,
            Vendor will promptly relieve and replace the affected Person. (e) Records: Vendor will
            retain duty-time and rest records for 12 months and produce them on request.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">28B) Secondary Employment; Double-Shift Controls</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor will implement reasonable measures to prevent fatigue from double-shifts or work
            performed for other employers. Prior to assignment, Personnel will attest whether they
            have worked in the preceding 10 hours and disclose other scheduled duty in the next 10
            hours. Vendor will schedule so that the HOS limits in Section 28A are not exceeded when
            combined with other known employment. If an attestation or observation indicates likely
            fatigue or an HOS exceedance, the Personnel will not be assigned or will be removed and
            replaced.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">29) Work Authorization</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor represents that Personnel assigned to Jobs are legally authorized to work in the
            jurisdiction where services are performed and that Vendor complies with applicable
            verification laws.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">30) Data Retention &amp; Location</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor will not transfer Platform or End Client data outside the country of collection
            unless compliant with applicable law and contractual requirements. Retain per Sections
            11C and 15A.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">31) End Client as Third-Party Beneficiary (Insurance Only)</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Where named as Additional Insured in Job details, the End Client is a third-party
            beneficiary solely with respect to insurance provisions.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">32) Onsite Access &amp; Badging</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor will comply with End Client access control and badging procedures and
            return/disable access upon Job completion (see Section 21A).
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">33) Pricing Confidentiality; No Reverse Engineering</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor will keep Tectus pricing, markups, fees, algorithms, and payout structures
            confidential and will not attempt to reverse engineer or disclose them.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">33A) Limited Non-Solicitation</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            During the term and for 12 months thereafter, Vendor will not solicit for employment or
            engagement any employee of Tectus or knowingly induce another participating vendor to
            cease doing business with Tectus; general solicitations not directed at such persons are
            permitted.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">34) Government Flow-Down (If Applicable)</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            For Jobs under public-sector contracts, applicable flow-down terms will be posted in the
            Job details and are incorporated by reference and control for that Job.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">35) Health &amp; Safety; PPE</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor will furnish and ensure proper use of PPE, perform hazard assessments, and comply
            with OSHA/State OSHA or equivalent safety requirements.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">36) Incident Escalation Protocol</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            In emergencies, call local authorities first, then notify End Client site contacts, then
            Tectus through designated channels. Follow SOPs for notification order where specified.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">37) Work Product; Reports</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Daily activity logs, incident reports, and footage generated for a Job are owned by
            Tectus or the End Client (as specified in Job details). Vendor retains copies only as
            required by law or Section 11C and may not use for other purposes without written
            consent.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c6">
          <span className="c5">
            38) Public Statements; Anti-Defamation (Non-Disparagement)
            <br />
          </span>
          <span className="c3">
            During the Term and for twelve (12) months thereafter, Vendor will not make, publish,
            republish, or cause to be published any public statement (including social media posts,
            online reviews/ratings, blogs, forums, or mass emails) about Tectus, its affiliates, End
            Clients, or their personnel or services that Vendor knows to be false or makes with
            reckless disregard for whether it is true or false, including statements that are
            materially misleading because they omit facts necessary to make the statement, taken as
            a whole, not misleading. Vendor will not knowingly amplify, endorse, or republish
            third-party content that Vendor knows, or recklessly disregards, is false or materially
            misleading.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c6">
          <span>
            Safe Harbors. Nothing in this Section prohibits: (a) opinions clearly identified as
            opinion that do not imply undisclosed false facts; (b) truthful statements required by
            law, subpoena, or a government investigation; (c) good-faith reports to law enforcement
            or regulators; (d) testimony or filings in arbitration or court; or (e) communications
            protected by applicable whistleblower, labor, or anti-retaliation laws.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">38A) Retraction/Takedown</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            (a) Retraction/Takedown. Upon written Notice from Tectus identifying a non-compliant
            public statement under Section 38, Vendor will promptly (and in any event within two (2)
            business days) remove or correct the statement in substantially the same forum and
            manner, and issue a clarification or retraction if reasonably requested. Failure to cure
            is a material breach and Tectus may seek injunctive relief under Section 22A and setoff
            under Section 13.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">39) Public Communications; Media</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Vendor will not issue press releases or speak to media about a Job or End Client without
            Tectus&rsquo;s prior written approval, except where legally required.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2 c4">
          <span className="c3"></span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c1">40) Survival</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Sections that by their nature should survive (including 5&ndash;6, 8&ndash;12, 12A,
            12C&ndash;12D, 13&ndash;15D, 16&ndash;19, 20&ndash;22B, 23&ndash;25B, 27&ndash;39,
            41&ndash;42) will survive termination.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">41) Insurance Review Disclaimer</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            Any review or acceptance of Vendor insurance documents by Tectus does not constitute a
            waiver of requirements or an assumption of risk and shall not reduce Vendor&rsquo;s
            obligations.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c0">
          <span className="c1">42) Claims Limitation Period</span>
        </UiTypography>
        <UiTypography variant="body1" className="c2">
          <span className="c3">
            To the maximum extent permitted by law, each party&rsquo;s claim arising out of or
            relating to these Terms must be filed within two (2) years after the claim accrues. This
            limitation does not apply where prohibited by law (including non-waivable statutory
            rights) and does not limit either party&rsquo;s claims for confidentiality, IP, fees
            due, or indemnification.
          </span>
        </UiTypography>
        <UiTypography variant="body1" className="c2 c4">
          <span className="c3"></span>
        </UiTypography>
      </Container>
    </div>
  );
}

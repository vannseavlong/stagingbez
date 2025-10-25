"use client";

const PrivacyPolicy = () => {
  return (
    <div>
      <div className="min-h-screen bg-white flex justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="w-full max-w-4xl  p-8 lg:p-12">
          <header className="border-b pb-6 mb-8">
            <h1 className="text-4xl font-extrabold text-beasy-gradient tracking-tight mb-2">
              PRIVACY POLICY
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Last updated: 8 July 2025
            </p>
          </header>

          <section className="space-y-8 text-gray-700 leading-relaxed">
            <p>
              This Privacy Policy (the &ldquo;Notice&rdquo;) governs the use and
              access of the bEasy App and Website (as defined below), including
              any content, functionality and services offered on or through
              https://beasy.info/ or the bEasy App and Suntel.io (hereinafter
              referred to as &ldquo;Service&rdquo;) by Suntel Technology
              Cambodia Co., Limited (hereinafter referred to as
              &ldquo;Suntel&rdquo;) and its affiliates/subsidiaries with its
              address at Flatiron by Meridian, FO-2312, FO-2313, FO-2314 Unit,
              Street 102, Phnom Penh City Center, Phum 1, Sangkat Srah Chak,
              Khan Daun Penh, Phnom Penh, Cambodia.
            </p>

            {/* SECTION 1: THE SERVICES */}
            <h2
              className="text-2xl font-bold text-gray-900 pt-4"
              id="section-1"
            >
              {" "}
              A. COLLECTION OF PERSONAL DATA
            </h2>

            <p>
              &ldquo;Personal Data&rdquo; means information about you from which
              you are identifiable, including but not limited to your name,
              identification card number, birth certificate number, passport
              number, nationality, address, telephone number, fax number, bank
              details, credit card details, race, gender, date of birth, marital
              status, resident status, education background, financial
              background, personal interests, email address, your occupation,
              and any other similar information about you that may be collected,
              stored, used, and processed by Suntel.
            </p>

            <p className="text-base">
              The provision of your Personal Data is voluntary. However, if you
              do not provide Suntel with your Personal Data, Suntel will not be
              able to process your Personal Data for the purposes outlined
              below. If you are an agent, vendor, supplier, or service provider,
              the provision of your Personal Data is mandatory and failure to
              provide it may be a breach of laws or regulatory requirements.
            </p>

            <p className="text-base">
              By using any service of Suntel or its partners, including all
              websites operated under its respective brands, your personal data
              may also be collected from cookies used on the websites.
            </p>

            {/* SECTION 2: USAGE OF THE APPLICATION */}
            <h2
              className="text-2xl font-bold text-gray-900 pt-4"
              id="section-2"
            >
              {" "}
              B. PURPOSE AND USAGE OF INFORMATION
            </h2>

            <h3 className="text-xl font-semibold text-gray-800">
              {" "}
              1. General use:
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-base">
              <li>To respond to your questions, comments, and feedback.</li>
              <li>
                To communicate with you for any of the purposes listed in this
                Notice.
              </li>
              <li>
                For internal administrative purposes, such as auditing, data
                analysis, and maintaining database records.
              </li>
              <li>
                For purposes of detection, prevention, and prosecution of crime.
              </li>
              <li>
                For Suntel to comply with its obligations under the law, and you
                agree and consent to Suntel using and processing your Personal
                Data as described in this Notice.
              </li>
            </ul>

            {/* SECTION 3: PAYMENT */}
            <h2
              className="text-2xl font-bold text-gray-900 pt-4"
              id="section-3"
            >
              2. Customers of Suntel services:
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-base">
              <li>
                To perform Suntel&apos;s obligations under any contract entered
                into with you.
              </li>
              <li>To provide you with any service you have requested.</li>
              <li>To process your subscriptions and deliver the services.</li>
              <li>
                To process your request to download and use the Suntel
                Applications (&ldquo;App&rdquo;), deliver the App to you, and
                provide a license for its use.
              </li>
              <li>
                To manage your participation in events, promotions, surveys, or
                other marketing activities.
              </li>
              <li>
                To verify your application for subscription with Suntel and
                provide benefits offered to subscribers.
              </li>
              <li>
                To validate your bookings and process payments related to any
                requested products or services.
              </li>
              <li>
                To understand and analyze our sales performance, user needs, and
                preferences.
              </li>
              <li>
                To develop, enhance, and provide products and services that meet
                your needs.
              </li>
              <li>To process exchanges or product returns.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { configureLayout } from '../../store/ui/Global';

export class PrivacyCtnr extends React.PureComponent {
  componentDidMount() {
    this.props.configureLayout({
      showAppActions: true,
      appBodyBackground: '#FFF'
    });
  }

  render() {
    const sectionTitleStyle = {
      marginTop: '30px'
    };

    const tableStyle = {
      width: '700px',
      margin: '15px 15px 15px 0',
      border: '1px solid black',
      borderCollapse: 'collapse'
    };

    const colHeadStyle = {
      padding: '5px 10px'
    };

    const cellStyle = {
      padding: '10px',
      border: 'solid 1px black'
    };

    return (
      <div className="container" style={{ marginBottom: '40px' }}>
        <div className="Privacy">
          <h2>Privacy Policy</h2>
          <p>
            <strong>Updated on April 13, 2016 </strong>
          </p>
          <h4 style={sectionTitleStyle}>
            1. Description of SSI’s Business.
          </h4>
          <p>
            Survey Sampling International, LLC (“SSI” and any
            reference to “SSI” or “us” or “we” or “our” shall include
            SSI’s parents, affiliates, and subsidiaries) provides
            sampling solutions and technology for survey research, and
            providing clients with access to consumer and
            business-to-business respondents via internet, telephone
            (both fixed/landline and wireless/mobile), postal and
            multi-mode methodologies. SSI serves a vast array of
            for-profit and not-for profit businesses, universities and
            governmental agencies and departments.
          </p>
          <p>
            This Privacy Policy describes the types of information we
            collect, how we collect information, how we use the
            information, how we share or disclose the information, how
            we store the information, and your choices regarding the
            use and processing of the information. Your use of SSI’s
            website, your use of SSI’s services, and your disclosure
            of PII to SSI are completely voluntarily, therefore the
            collection, processing, transfer, and storage of your PII
            as set forth in this Privacy Policy is with your consent.{' '}
          </p>
          <p>
            This privacy policy does not apply to the collection,
            processing, storage, transfer, and/or disposal of
            information collected in connection with the survey panels
            or communities operated by or on behalf of SSI.{' '}
          </p>
          <h4 style={sectionTitleStyle}>
            2. What type of information do we collect?{' '}
          </h4>
          <p>We collect the following information:</p>
          <ol type="i">
            <li>
              Personally identifiable information (“PII”) which
              includes, without limitation, first and last names,
              email address, telephone number(s) (e.g., home, mobile,
              and business numbers), and residential address.
            </li>
            <li>
              Business contact information, including, without
              limitation, company name, job title, and department.
            </li>
            <li>
              Information on your employer or the company you
              represent.
            </li>
            <li>
              Information collected through automated means, includes,
              without limitation, IP address, browser type, operating
              system, referring URLs, information on actions or
              activities taken or engaged in on a website, and dates
              and times of website visits.
            </li>
          </ol>
          <h4 style={sectionTitleStyle}>
            3. How we collect information.
          </h4>
          <ol type="i">
            <li>Information submitted or provided by you:</li>
            <ol type="a">
              <li>
                Through or in connection with SSI’s corporate
                website(s), including, without limitation,
                www.surveysampling.com;
              </li>
              <li>
                Through or in connection with business meetings with
                actual or potential customers or clients;
              </li>
              <li>
                Through or in connection with promotions, meetings,
                events, and/or trade or industry shows or conferences
                sponsored by, hosted by, or attended by SSI and/or
                SSI’s employees, representatives, and/or agents; and
              </li>
              <li>
                Through telephone calls, email communications, and/or
                other forms of communication with you.
              </li>
              <li>
                Through inquiries, from requests for bids or quotes
                from SSI, and from orders for SSI’s services.
              </li>
            </ol>
            <li> Information collected from third parties </li>
            <p>
              SSI may collect information, including, without
              limitation, PII and business contact information, from
              third parties, including, without limitation,
              information service bureaus, data brokers, social media
              platforms, and/or industry conference or event
              organizers or sponsors. We may use the information
              collected from such third parties for various purposes,
              including, without limitation, sending you emails or
              other communications as described herein. In the event
              you receive such communications you will have the
              opportunity to opt-out of receiving communications from
              us.
            </p>
            <li>Information collected through automated means: </li>
            <ol type="a">
              <li>
                SSI Cookies. Cookies are small files that store
                certain data on a device or computer. SSI may use
                session and persistent cookies for several purposes
                including, without limitation, to enable you to use
                and transverse a website and quality control. Session
                cookies expire when you close your browser. Persistent
                cookies remain on your device or computer indefinitely
                until deleted. A user may disable and/or delete
                cookies via the user’s browser or otherwise, however,
                this may limit your use of a website, and/or decrease
                the functionality available to the user in connection
                with a website.{' '}
              </li>
              <li>
                Third Party Cookies. SSI uses third parties to provide
                services and certain functionality to SSI. SSI uses
                contracts with such third parties to control their use
                of cookies and to limit their use of cookies to the
                limited purposes set forth in the contracts.
              </li>
              <li>
                Log Files. SSI’s websites may automatically gather and
                store certain information in log files, including,
                without limitation, data available from your web
                browser, including, without limitation, IP Address,
                browser type, internet service provider,
                referring/exiting pages, operating system, date/time
                stamp and click stream data.
              </li>
              <li>
                Cookie Notice: SSI values your privacy. Below please
                find a list of the cookies set or deployed by SSI
                and/or its service providers, partners, and/or
                subcontractors. For certain cookies no opt-out
                mechanism is provided.
              </li>
            </ol>
            <ol type="A">
              <li> Essential Cookies: </li>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={colHeadStyle}>Name:</th>
                    <th style={colHeadStyle}>Purpose</th>
                    <th style={colHeadStyle}>Consent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={cellStyle}>ASP.NET_SessionId</td>
                    <td style={cellStyle}>Session Cookie</td>
                    <td style={cellStyle}>No opt-out provided</td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Calltrk_referrer</td>
                    <td style={cellStyle}>
                      Tracks the last website visited prior to landing
                      on a website.
                    </td>
                    <td style={cellStyle}>No opt-out provided</td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Calltrk_landing</td>
                    <td style={cellStyle}>
                      Tracks the website or webpage landed on by the
                      visitor.
                    </td>
                    <td style={cellStyle}>No opt-out provided</td>
                  </tr>
                </tbody>
              </table>
              <li> Analytics and Customization – Data Collection </li>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={colHeadStyle}>Name:</th>
                    <th style={colHeadStyle}>Purpose</th>
                    <th style={colHeadStyle}>Consent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={cellStyle}>
                      Google Analytics (_utma)
                    </td>
                    <td style={cellStyle}>
                      {' '}
                      Analytics/measurement<br /> Optimization<br />{' '}
                      Ad targeting
                    </td>
                    <td style={cellStyle}>No opt-out provided</td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>
                      Google Analytics (_utmb)
                    </td>
                    <td style={cellStyle}>
                      {' '}
                      Analytics/measurement<br /> Optimization<br />{' '}
                      Ad targeting
                    </td>
                    <td style={cellStyle}>No opt-out provided</td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>
                      Google Analytics (_utmc)
                    </td>
                    <td style={cellStyle}>
                      Session Cookie –<br /> Analytics/measurement<br />{' '}
                      Optimization<br /> Ad targeting
                    </td>
                    <td style={cellStyle}>No opt-out provided</td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>
                      Google Analytics (_utmz)
                    </td>
                    <td style={cellStyle}>
                      Analytics/measurement<br /> Optimization<br />{' '}
                      Ad targeting
                    </td>
                    <td style={cellStyle}>No opt-out provided</td>
                  </tr>
                </tbody>
              </table>
            </ol>
          </ol>

          <p>SSI’s Do Not Track Notice.</p>
          <p>
            Do Not Track (“DNT”) is a preference in your browser that
            you can set to notify websites that you visit that you do
            not want the websites to collect certain information about
            you. SSI does not respond to DNT signals. If you object to
            SSI’s practice with regards to DNT signals, you are free
            not to visit SSI’s website.
          </p>
          <h4 style={sectionTitleStyle}>
            4. How We Use the Information that We Collect.
          </h4>
          <p>
            We may use information, including, without limitation, PII
            and business contact information, to:
          </p>
          <ol type="i">
            <li>
              Provide, administer, and communicate with you about
              SSI’s products, promotions, services, events (e.g.,
              webinars, etc.), newsletters, and industry
              expertise/knowledge (e.g., whitepapers, articles, etc.);
            </li>
            <li>
              Create, supplement, and update SSI’s directories and
              records for actual and/or potential suppliers,
              customers, and/or clients;
            </li>
            <li>
              Protect against and prevent fraud, claims, liabilities,
              and to manage risk exposure;
            </li>
            <li>Respond to inquiries and requests;</li>
            <li>
              Operate, evaluate, conduct, and improve SSI’s business
              (including, without limitation, to conduct and complete
              transactions for SSI’s products and/or services, to
              improve SSI’s current products and/or services, to
              develop new products and/or services, etc.);
            </li>
            <li>
              Process and manage opt-out or unsubscribe requests;
            </li>
            <li>
              Comply with applicable laws, regulations, codes, and
              industry standards and practices;
            </li>
            <li>
              Conduct marketing and market research activities
              including, without limitation,: (a) contacting you to
              participate in customer satisfaction surveys or
              questionnaires via telephone, email, or otherwise, and
              (b) soliciting your opinions or feedback on SSI’s
              business activities, including, without limitation,
              current and future products and services;
            </li>
            <li>
              Create and send targeted communications to you regarding
              you or your company’s transactions with SSI and/or the
              profile for your company;{' '}
            </li>
            <li>
              Respond to a subpoena or an order of a court or
              government agency;
            </li>
            <li>
              Establish, exercise, or defend legal claims, including,
              without limitation, in order to protect the safety of an
              individual or to protect SSI’s rights and/or property;
              and{' '}
            </li>
            <li>
              Evaluate your interest in employment and contact you
              regarding possible employment opportunities with SSI
              and/or any company within the SSI group of companies.
            </li>
          </ol>
          <p>
            In addition to the above, SSI may use information
            collected or received by SSI as otherwise set forth in
            this Privacy Policy.{' '}
          </p>
          <p>
            In the event that you provide SSI with any feedback,
            suggestions, and/or comments regarding SSI’s business
            activities, including, without limitation, regarding
            current and/or future products and/or services, SSI may
            use, apply, and implement such feedback, suggestions,
            and/or comments, at SSI’s discretion, and without notice
            to you, without any consent or approval from you, without
            any compensation to you, and/or without any attribution or
            credit to you, and you hereby irrevocably assign and
            transfer to SSI all right, title, and interest in and/or
            to any such feedback, suggestions, and/or comments.{' '}
          </p>
          <h4 style={sectionTitleStyle}>
            5. How do we share your information?{' '}
          </h4>
          <p>
            SSI does not sell your information and does not disclose
            your information, except as described in this Privacy
            Policy or as otherwise consented to by you.
          </p>
          <p>
            We may share information, including, without limitation,
            PII and business contact information, as follows:
          </p>
          <ol type="i">
            <li>
              Within the SSI group of companies (with SSI’s parents,
              subsidiaries, and affiliates) and the directors,
              managers, officers, employees, consultants, and agents
              of these companies, subject to the terms of this Privacy
              Policy or as otherwise disclosed to you at the time of
              the collection of your information or as subsequently
              consented to by you.{' '}
            </li>
            <li>
              To service providers who are performing services on our
              behalf, whether engaged directly by SSI or engaged by a
              third party, including, without limitation, companies
              providing email delivery services, fraud detection and
              prevention services, event coordination and management,
              etc. The service providers are authorized to use and
              disclose the information only as necessary to perform
              and provide the services for which they were engaged and
              subject to the terms set forth in this Privacy Policy.{' '}
            </li>
            <li>
              We may disclose information about you: (i) if we are
              required to do so pursuant to applicable laws or legal
              or court process; or (ii) when we believe disclosure is
              necessary to prevent harm or financial loss, or in
              connection with an investigation of actual or suspected
              fraud or illegal activity.{' '}
            </li>
            <li>
              We reserve the right to transfer information about you
              in the event of a merger, acquisition, sale or other
              transaction involving SSI. In addition, we may transfer
              your information in the event of a change of control
              event. Following a transfer covered by this Sub-Section
              (iv) you may contact the entity to whom your information
              was transferred, with any inquiries concerning the
              processing of your information.{' '}
            </li>
          </ol>
          <h4 style={sectionTitleStyle}>
            6. Where is Information Stored?
          </h4>
          <p>
            Information, including, without limitation, PII and
            business contact information, is primarily stored on
            servers and systems located in the United States, which
            servers are licensed, owned, and/or maintained by or on
            behalf of SSI. Your information may also be stored on or
            in local servers, networks, and files maintained by or on
            behalf of a company within the SSI Group of companies. BY
            DISCLOSING YOUR PII TO SSI YOU ARE EXPRESSLY CONSENTING TO
            THE TRANSFER AND EXPORTING OF YOUR PERSONAL INFORMATION TO
            COUNTRIES OUTSIDE OF THE COUNTRY WHERE YOU MAY RESIDE,
            INCLUDING, WITHOUT LIMITATION, TO THE UNITED STATES.{' '}
          </p>
          <p>
            SSI complies with the principles set forth in the United
            States (“US”) – European Union (“EU”) and US – Swiss Safe
            Harbor Frameworks as set forth by the US Department of
            Commerce regarding the collection, use and retention of
            personal data from EU member countries and Switzerland.
            SSI has certified that it adheres to the Safe Harbor
            Privacy Principles of notice, choice, onward transfer,
            security, data integrity, access and enforcement. To learn
            more about the Safe Harbor program, and to view SSI’s
            certification page, please visit
            http://www.export.gov/safeharbor/.
          </p>
          <h4 style={sectionTitleStyle}>
            7. What Security Measures Has SSI Implemented?
          </h4>
          <p>
            SSI maintains appropriate technical, administrative and
            physical safeguards to protect information, including,
            without limitation, PII, received or collected by SSI. SSI
            reviews, monitors and evaluates its privacy practices and
            protection systems on a regular basis. Notwithstanding the
            foregoing, transmissions over the Internet and/or a mobile
            network are not one hundred percent (100%) secure and SSI
            does not guarantee the security of such transmissions. SSI
            is not responsible for any errors by individuals in
            submitting PII to SSI.{' '}
          </p>
          <h4 style={sectionTitleStyle}>8. How can I opt-out?</h4>
          <p>You may opt-out by:</p>
          <ol type="a">
            <li>
              clicking on the unsubscribe link contained in any e-mail
              communication received from SSI; or{' '}
            </li>
            <li>contacting us as set forth below. </li>
          </ol>
          <h4 style={sectionTitleStyle}>
            9. How Can You Access Your Information?
          </h4>
          <p>
            You may access information we collect from or about you in
            order to review, edit, or delete such information, or you
            may exercise your right to opt-out from communications
            from SSI, by:
          </p>
          <ol type="i">
            <li>
              Sending an email request to info@surveysampling.com;
            </li>
            <li>
              Sending an email request to privacy@surveysampling.com;
            </li>
            <li>
              Sending a request via regular mail, postage pre-paid to:{' '}
              <br />
              Survey Sampling International, LLC <br />
              6 Research Drive <br />
              Shelton, Connecticut 06484 USA <br />
              Attention: Legal Department
            </li>
          </ol>
          <h4 style={sectionTitleStyle}>10. Children’s Privacy. </h4>
          <p>
            SSI believes it is important to protect the online privacy
            of children. Accordingly, SSI adheres to applicable laws
            and codes pertaining to the protection of children’s
            privacy, including, without limitation, the Children’s
            Online Privacy Protection Act of 1998 in the United States
            (as amended). SSI does not knowingly collect PII from
            anyone under the age thresholds prescribed by applicable
            laws and codes for the collection of PII from individuals
            without parental consent. If SSI became aware that it
            inadvertently collected PII from anyone under such age
            thresholds, SSI would promptly delete such PII.
          </p>
          <h4 style={sectionTitleStyle}>
            11. How Long Does SSI Retain My Information?
          </h4>
          <p>
            SSI will retain PII and other information about you for
            such period of time as may be required or permissible by
            law.{' '}
          </p>
          <h4 style={sectionTitleStyle}>
            12. Who can I contact with questions or complaints about
            this Privacy Policy?
          </h4>
          <p>Questions or Complaints Generally.</p>
          <p />
          <p>
            If you have any questions or complaints regarding SSI’s
            privacy practices and/or this Privacy Policy or want to
            communicate an opt-out request to SSI, or want to exercise
            your rights to access, review, correct, delete or object
            to the processing of PII, please contact us:{' '}
          </p>
          <p>via email at: privacy@surveysampling.com </p>
          <p>or </p>
          <p>via mail at: </p>
          <p>
            Legal Department <br />
            Survey Sampling International, LLC <br />
            6 Research Drive, Shelton, Connecticut 06484 USA<br />
            p: (203) 567-7200/e: privacy@surveysampling.com
          </p>
          <p>
            SSI has further committed to refer unresolved privacy
            complaints under the US-EU and US-Swiss Safe Harbor
            Privacy Principles to an independent dispute resolution
            mechanism, the CASRO SAFE HARBOR PROGRAM. If you do not
            receive timely acknowledgment of your complaint, or if
            your complaint is not satisfactorily addressed by SSI,
            please visit the CASRO SAFE HARBOR PROGRAM website at
            https://www.casro.org/?complaintcasrosh for more
            information and to file a complaint.
          </p>
          <h4 style={sectionTitleStyle}>
            13. Are there any companies within the SSI group that may
            collect, store and process PII?
          </h4>
          <p>Yes, please see the list of companies below:</p>
          <ul>
            <li>
              Survey Sampling Europe BV – Weena 161, 3013 CK
              Rotterdam, Netherlands.{' '}
            </li>
            <li>
              Survey Sampling Bulgaria EOOD – Triaditza area, #82,
              Patriarh Evtimii street, 1463, Sofia, Bulgaria.
            </li>
            <li>
              SSI Denmark ApS – Frederiksholms Kanal 4B, DK-1220,
              Copenhagen K Copenhagen.
            </li>
            <li>
              Survey Sampling France SASU – 22 rue de Dunkerque, 75010
              Paris, France.
            </li>
            <li>
              Survey Sampling Germany GmbH – Kaiserstrasse 13, 60311
              Frankfurt am Main, Deutschland.
            </li>
            <li>
              Survey Sampling RO S.R.L. – 12 Popa Sapca Street,
              Timisoara 300057.
            </li>
            <li>
              Survey Sampling Spain S.L. – C/ Carranza, 25, 2ª planta,
              28004, Madrid, Spain.
            </li>
            <li>
              SSI Sweden AB – Drakens Gränd 8, 111 30 Stockholm,
              Sweden.
            </li>
            <li>
              Survey Sampling UK Ltd. – India House, 2nd Floor 45
              Curlew Street London SEI 2nd United Kingdom.
            </li>
            <li>
              Survey Sampling Hong Kong Ltd. – 6/F, Hollywood Centre,
              233 Hollywood Road, Sheung Wan, Hong Kong.
            </li>
            <li>
              SSI Beijing Co. Ltd. – CBD International Mansion, Room
              901A, No. 16 Yongandongli, Chaoyang District, Beijing
              100022, China.
            </li>
            <li>
              Survey Sampling Australia Pty. Ltd. – Level 11, 131 York
              Street, Syndey NSW 2000, Australia.
            </li>
            <li>
              Survey Sampling Singapore PTE Ltd. – #58 Republic Plaza,
              9 Raffles Place, Singapore 048619.
            </li>
            <li>
              Survey Sampling International Services Company S.De R.L.
              De C.V. – Cordoba 42, Piso 9, Col. Roma Norte/Del.
              Cuauhtemoc, Mexico, D.F. 06700.
            </li>
            <li>
              Survey Sampling Korea Ltd. – Level 4, 27-8,
              Gukjegeumyung-ro 8-gil Yeongdeungpo-gu, Seoul Korea
              150-998.
            </li>
            <li>
              Survey Sampling Japan GK – 3F KK Building, I-8-5,
              Shinkawa, Chuo-Ku, 104-0033, Tokyo, Japan.
            </li>
            <li>
              SSI Do Brasil Pesquisa de Mercado Ltda. – Rua das
              Olimpiadas, 205 – 40 ander 04551-000, Sao Paulo, Brasil.
            </li>
            <li>
              SSI Philippines Inc. – PIPC Bldg 7, MEPZ II, Basak,
              Lapu-Lapu, Cebu 6015, Philippines.
            </li>
            <li>
              MRops Programming India Private Ltd. – 8th Floor, Block
              1, My Home Hub, Madhapur, Hyderabad, TG 500081.
            </li>
            <li>Mountain West Research Center L.C.</li>
            <li>
              Survey Sampling Hungary Kft. – Lion Office Center, 2
              Vágóhíd Street, 7th Building, 3rd floor, H-4030
              Debrecen, Hungary.
            </li>
          </ul>
          <h4 style={sectionTitleStyle}>
            14. Links To Other Websites.
          </h4>
          <p>
            SSI’s website(s) may contain or provide links to other
            websites for your convenience and information. These
            websites may operate independently from SSI. Linked sites
            may have their own privacy notices or policies, which we
            strongly suggest you review if you visit any linked
            websites. To the extent any linked websites you visit are
            not owned or controlled by SSI, SSI is not liable or
            responsible for the websites’ content, any use of the
            websites, or the privacy practices of the owners of the
            websites.{' '}
          </p>
          <h4 style={sectionTitleStyle}>
            15. Updates to this Privacy Policy.
          </h4>
          <p>
            This Privacy Policy may be updated periodically and
            without prior notice to you to reflect changes to SSI’s
            practices and procedures set forth herein. In the event of
            any updates or changes to this Privacy Policy, SSI will
            post a prominent notice on SSI’s website(s) to notify you
            of any significant changes.
          </p>
        </div>
      </div>
    );
  }
}

PrivacyCtnr.propTypes = {
  configureLayout: PropTypes.func
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  configureLayout(config) {
    dispatch(configureLayout(config));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PrivacyCtnr
);

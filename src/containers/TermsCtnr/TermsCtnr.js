import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { configureLayout } from '../../store/ui/Global';

export class TermsCtnr extends React.PureComponent {
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

    return (
      <div className="container" style={{ marginBottom: '40px' }}>
        <h2>Terms &amp; Conditions</h2>
        <p>
          <strong>Effective September 15, 2016</strong>
        </p>
        <p>
          <strong>Updated October 5, 2017</strong>
        </p>
        <p>
          The following sets forth the terms of your use for the
          Survey Sampling International, LLC’s (“SSI”, “we” or “us”)
          Survey Builder tool (“Service”). You may be referred to as
          “you” or “Client” herein. Your use of the Survey Builder
          platform or on after September 15, 2016 shall evidence your
          consent to these terms.
        </p>
        <h4 style={sectionTitleStyle}>Entire Agreement</h4>
        <p>
          This is the sole agreement between the parties with respect
          to the Service. This Agreement expressly supersedes any
          prior agreements and/or terms of use relating to the Service
          between you and SSI or any predecessor in interest to SSI,
          including but not limited to Instantly, Inc. and/or uSamp
          (United Sample). Any terms provided by either party
          following the execution hereof shall be of no force and
          effect relating to your use of the Service. Any master
          services agreement between the parties entered into prior to
          or after execution of this Agreement shall expressly exclude
          the Service.{' '}
        </p>
        <h4 style={sectionTitleStyle}>Purchase of Sample</h4>
        <p>
          If your use of the Service includes the purchase of sample
          from SSI, such sample purchase shall be subject to
          additional terms.{' '}
        </p>
        <h4 style={sectionTitleStyle}>Fees</h4>
        <p>
          All fees relating to the Service exclude tax and payment
          terms are net 30. Unless otherwise determined by local law,
          undisputed past due amounts will accrue interest at a rate
          of two percent (2%) per month.
        </p>
        <h4 style={sectionTitleStyle}>Term</h4>
        <p>
          This Agreement shall continue until terminated by either
          party without cause upon thirty days written notice. In
          addition, the Service may be terminated and/or suspended at
          any time by SSI upon thirty (30) days electronic mail notice
          without further liability or obligation to you.
        </p>
        <p>
          <strong>The Service is Offered on an “as is” Basis</strong>
        </p>
        <p>
          SSI offers no service level and/or uptime commitments with
          respect to the Service, and you agree and acknowledge that
          you shall have no monetary claim for damages in the event
          the Service is not available to you during the term hereof.
          SSI HEREBY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED WITH
          RESPECT TO THE SERVICES AND DELIVERABLES PROVIDED HEREUNDER,
          IF ANY, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
          WARRANTIES OF NON-INFRINGEMENT AND ANY IMPLIED WARRANTIES
          ARISING OUT OF A COURSE OF PERFORMANCE, DEALING, OR TRADE
          USAGE. TO THE EXTENT SSI MAY NOT, AS A MATTER OF APPLICABLE
          LAW, DISCLAIM ANY WARRANTY, THE SCOPE AND DURATION OF SUCH
          WARRANTY SHALL BE LIMITED TO THE MINIMUM PERMITTED UNDER
          SUCH APPLICABLE LAW.{' '}
        </p>
        <h4 style={sectionTitleStyle}>Your Content</h4>
        <p>
          You agree that you either own or have lawfully licensed
          rights in or to all property, content, and material
          supplied, provided, and/or used in connection with the
          Service and its activities in connection therewith.
        </p>
        <p>
          You agree to comply with all applicable laws, including but
          not limited to, intellectual property and privacy laws.{' '}
        </p>
        <p>
          You agree that your surveys will not contain any obscene,
          pornographic, illegal, defamatory, libelous, fraudulent,
          abusive, indecent, infringing or misappropriating, or
          hateful material or content and you agree that SSI reserves
          the right to remove any such material or content, without
          your prior consent{' '}
        </p>
        <p>
          You represent that the primary purpose of the
          questionnaire(s) is legitimate survey research not changing
          the opinion of any population (Push Polling), soliciting
          donations under the guise of research (FRUGGING), or direct
          selling of products and services under the guise of research
          (SUGGING).
        </p>
        <h4 style={sectionTitleStyle}>Ownership of deliverables</h4>
        <p>
          For any data collection services performed by SSI and/or for
          any surveys hosted by SSI, the parties agree that SSI and
          Client shall jointly own all right, title and interest in
          survey responses collected by SSI and/or any additional data
          collected from respondents via SSI’s platform.
        </p>
        <h4 style={sectionTitleStyle}>
          Acceptable Use of the Service
        </h4>
        <p>
          You must comply with the following requirements when using
          the Service:
        </p>
        <ol type="a">
          <li>
            You may not misuse our Service by interfering with their
            normal operation, or attempting to access them using a
            method other than through the interfaces and instructions
            that we provide;
          </li>
          <li>
            You may not circumvent or attempt to circumvent any
            limitations that SSI imposes on your use of the Service;
          </li>
          <li>
            Unless authorized by SSI in writing, you may not probe,
            scan, or test the vulnerability of any SSI system or
            network;
          </li>
          <li>
            Unless permitted by applicable law, you may not deny
            others access to, or reverse engineer, the Service, or
            attempt to do so;
          </li>
          <li>
            You may not transmit any viruses, malware, or other types
            of malicious software, or links to such software, through
            the Service;
          </li>
          <li>
            You may not engage in abusive or excessive usage of the
            Service, which is usage significantly in excess of average
            usage patterns that adversely affects the speed,
            responsiveness, stability, availability, or functionality
            of the Service for other users. SSI will endeavor to
            notify you of any abusive or excessive usage to provide
            you with an opportunity to reduce such usage to a level
            acceptable to SSI;
          </li>
          <li>
            You acknowledge and agree that you will not collect or
            record any respondent identifiable-information without the
            prior express written consent of SSI. If you collect or
            record respondent identifiable-information, with SSI’s
            prior express written consent, you agree you will not use,
            publish, disclose, transfer, or store the respondent
            identifiable-information.
          </li>
          <li>
            You may not use the Service to infringe the intellectual
            property rights of others, or to commit an unlawful
            activity; and/or unless authorized by SSI in writing, you
            may not resell or lease the Service.
          </li>
        </ol>
        <h4 style={sectionTitleStyle}>Client Indemnity</h4>
        <p>
          Client shall indemnify, defend, and hold harmless SSI and
          its parents, subsidiaries, and affiliates and its and their
          respective members, managers, shareholders, directors,
          officers, employees and agents from and against any and all
          liability, losses, damages, claims, causes of action,
          awards, judgments, and fees and costs (including reasonable
          attorneys’ fees and court costs) incurred by SSI, arising
          out of or related to: (i) Client’s violation of applicable
          laws, codes, regulations, rules, and requirements; and/or
          (ii) Client’s negligent acts or omissions or willful
          misconduct and/or breach of its obligations set forth
          herein.
        </p>
        <h4 style={sectionTitleStyle}>Limitation on Liability</h4>
        <p>
          Neither Party shall be liable to the other for any indirect,
          incidental, punitive, special or consequential damages
          (including, without limitation, lost profits) regardless of
          whether a Party is informed of the possibility the same may
          exist. Client hereby expressly excuses SSI from any claim or
          liability derived in whole or in part from: (i) Client’s use
          of the Service, Except for Client’s indemnification
          obligation, the total aggregate liability of each Party
          shall be limited to the amounts due from Client (which may
          include interest on past due amounts) relating to the
          Service.
        </p>
        <h4 style={sectionTitleStyle}>Governing Law</h4>
        <p>
          The Service and these Terms shall be governed by the laws of
          the State of New York without regard to choice of law
          principles.
        </p>
      </div>
    );
  }
}

TermsCtnr.propTypes = {
  configureLayout: PropTypes.func
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  configureLayout(config) {
    dispatch(configureLayout(config));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TermsCtnr
);

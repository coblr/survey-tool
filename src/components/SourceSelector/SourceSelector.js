import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';

import { getInterviewUrl } from '../../helpers/InterviewUrl';
import { getSourceConfigByMapId } from '../../helpers/SourceConfig';

import './SourceSelector.css';
import SVGIcon from '../SVGIcon/SVGIcon';
import ActionAlert from '../ActionAlert/ActionAlert';

export class SourceSelector extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showCopied: false
    };

    this.accordionConfig = [
      {
        category: 'web',
        iconId: 'link',
        title: 'Link to Your Survey',
        renderFormFn: this.renderWebLinkForm
      },
      {
        //   category: 'social',
        //   iconId: 'post-pin',
        //   title: 'Post on Social Networks',
        //   renderFormFn: this.renderSocialForm
        // },{
        category: 'email',
        iconId: 'send-email',
        title: 'Send Email Invites',
        renderFormFn: this.renderEmailForm
        // },{
        //   category: 'embed',
        //   iconId: 'embed',
        //   title: 'Embed Survey',
        //   renderFormFn: this.renderEmbedForm
      }
    ];
  }

  componentDidMount() {
    new Clipboard('.SourceSelector_clipboardCopyBtn');
  }

  render() {
    return (
      <div
        className="SourceSelector"
        style={{ visibility: 'hidden' }}>
        <div className="SourceSelector_titleBar">
          <SVGIcon
            iconId="arrow-dr-lg"
            className="SourceSelector_titleIcon"
          />
          <h3 className="SourceSelector_title">
            Choose Your Sources
          </h3>
        </div>
        <div className="SourceSelector_accordion">
          {this.accordionConfig.map((config, i) =>
            this.renderAccordionItem(config, i)
          )}
        </div>
        <p className="SourceSelector_disclaimer">
          Survey links are unique to each source and must not be
          modified.
        </p>
      </div>
    );
  }

  renderAccordionItem(config, index) {
    const { selectedCategory, toggleCategory } = this.props;

    let twirlyIconId = 'select-arrow-r';
    const classNames = {
      item: ['SourceSelector_accordionItem'],
      titleBar: ['SourceSelector_accordionTitleBar'],
      twirly: ['SourceSelector_accordionTwirly'],
      content: ['SourceSelector_accordionContent']
    };
    if (selectedCategory === config.category) {
      twirlyIconId = 'select-arrow';
      classNames.item.push('SourceSelector_accordionItem--selected');
      classNames.titleBar.push(
        'SourceSelector_accordionTitleBar--selected'
      );
      classNames.twirly.push(
        'SourceSelector_accordionTwirly--selected'
      );
      classNames.content.push(
        'SourceSelector_accordionContent--selected'
      );
    }

    return (
      <div key={index} className={classNames.item.join(' ')}>
        <div
          className={classNames.titleBar.join(' ')}
          onClick={() => toggleCategory(config.category)}>
          <div className="SourceSelector_accordionTitleIcon">
            <SVGIcon
              iconId={config.iconId}
              className="SourceSelector_accordionIcon"
            />
          </div>
          <div className="SourceSelector_accordionTitle">
            <SVGIcon
              iconId={twirlyIconId}
              className={classNames.twirly.join(' ')}
            />
            {config.title}
          </div>
        </div>
        <div className={classNames.content.join(' ')}>
          {config.renderFormFn.call(this)}
        </div>
      </div>
    );
  }

  renderSourceToggle(mapId) {
    const {
      match: { params: { surveyId } },
      surveySources,
      toggleSourceProp
    } = this.props;

    let source;
    const sources = surveySources[surveyId];
    const config = getSourceConfigByMapId(mapId);

    if (sources) {
      source = sources.find(
        s =>
          s.sourceType === config.sourceType &&
          s.channel === config.channel
      );
    }

    if (!source) return null;
    return (
      <div className="SourceSelector_enableSourceWrapper">
        <input
          type="checkbox"
          className="SourceSelector_enableSourceToggle"
          checked={source.visible}
          onChange={() =>
            toggleSourceProp(surveyId, source, 'visible')}
        />
        <span className="SourceSelector_enableSourceLabel">
          {"I'm using this source"}
        </span>
      </div>
    );
  }

  showCopied() {
    this.setState({ showCopied: true });
    setTimeout(() => this.setState({ showCopied: false }), 2000);
  }

  renderWebLinkForm() {
    const { match: { params: { surveyId } } } = this.props;
    const interviewUrl = getInterviewUrl(surveyId);

    const copiedClass = ['SourceSelector_copied'];
    if (this.state.showCopied) {
      copiedClass.push('SourceSelector_copied--show');
    }

    return (
      <div>
        <p className="SourceSelector_instructions">
          TIP: Please make sure your survey is tested and all logic is
          working properly before inviting respondents.
        </p>
        <h5 className="SourceSelector_webLinkTitle">Survey Link</h5>
        <div className="SourceSelector_webLinkWrapper">
          <input
            type="text"
            id="input_surveyWebLink"
            className="SourceSelector_webLinkInput"
            value={interviewUrl}
            readOnly
          />
          <button
            className="SourceSelector_clipboardCopyBtn"
            data-clipboard-target="#input_surveyWebLink"
            title="Copy survey link to clipboard"
            onClick={() => this.showCopied()}>
            <SVGIcon
              iconId="clipboard"
              className="SourceSelector_clipboardIcon"
            />
            <ActionAlert
              pointer="bottomCenter"
              className={copiedClass.join(' ')}>
              Copied!
            </ActionAlert>
          </button>
        </div>
        {this.renderSourceToggle('web')}
      </div>
    );
  }

  renderEmailForm() {
    const { match: { params: { surveyId } } } = this.props;
    const interviewUrl = getInterviewUrl(surveyId, 'email');
    const emailSubject = 'My New Survey';
    const emailBody = `\nHi!\n\nI created a new survey on Survey Builder!\nPlease click on the link below or paste it into your browser:\n\n${interviewUrl}\n\nThanks for participating!\n`;
    const mailTo = `mailto:?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    return (
      <div>
        <p className="SourceSelector_instructions">
          Send a link from your own email program.
        </p>
        <div className="SourceSelector_sourceWrapper">
          <a className="SourceSelector_emailBtn" href={mailTo}>
            <SVGIcon
              iconId="mail-lg"
              className="SourceSelector_emailBtnIcon"
            />
            Generate Email Invite
          </a>
        </div>
        {this.renderSourceToggle('email')}
      </div>
    );
  }

  renderSocialForm() {
    return (
      <div>
        <p className="SourceSelector_instructions">
          Promote your survey by clicking on any of the social network
          buttons below.
        </p>
        <p className="SourceSelector_instructions">
          {`Choose the "I'm using this source" checkbox to see updated stats reflected on this page.`}
        </p>
        <div className="SourceSelector_socialNetwork">
          <SVGIcon
            iconId="facebook"
            className="SourceSelector_socialIcon SourceSelector_socialIcon--facebook"
          />
          {this.renderSourceToggle('facebook')}
        </div>
        <div className="SourceSelector_socialNetwork">
          <SVGIcon
            iconId="linkedin"
            className="SourceSelector_socialIcon SourceSelector_socialIcon--linkedIn"
          />
          {this.renderSourceToggle('linkedIn')}
        </div>
        <div className="SourceSelector_socialNetwork">
          <SVGIcon
            iconId="twitter"
            className="SourceSelector_socialIcon SourceSelector_socialIcon--twitter"
          />
          {this.renderSourceToggle('twitter')}
        </div>
        <div className="SourceSelector_socialNetwork">
          <SVGIcon
            iconId="google"
            className="SourceSelector_socialIcon SourceSelector_socialIcon--google"
          />
          {this.renderSourceToggle('googlePlus')}
        </div>
      </div>
    );
  }

  renderEmbedForm() {
    const {
      match: { params: { surveyId } },
      embedSize,
      embedWidth,
      embedHeight,
      setEmbedSize,
      setEmbedWidth,
      setEmbedHeight
    } = this.props;

    const embedUrl = `https://platform.surveysampling.com/surveybuilder/survey/${surveyId}/embed-js?height=${embedHeight}&width=${embedWidth}`;
    const embedCode = `<script type="text/javascript" src="${embedUrl}"></script>`;

    return (
      <div>
        <p className="SourceSelector_instructions">
          Embed your survey on a webpage with this embed code.
          Knowledge of HTML is required.
        </p>
        <div className="SourceSelector_embedForm">
          <div className="SourceSelector_embedField">
            <label className="SourceSelector_embedLabel">Size:</label>
            <select
              value={embedSize}
              className="SourceSelector_embedSelect form-control"
              onChange={e => setEmbedSize(e.target.value)}>
              <option value="narrow">Narrow</option>
              <option value="medium">Medium</option>
              <option value="wide">Wide</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div className="SourceSelector_embedField">
            <label className="SourceSelector_embedLabel">
              Width:
            </label>
            <input
              type="text"
              className="SourceSelector_embedInput"
              value={embedWidth}
              onChange={e => setEmbedWidth(e.target.value)}
              readOnly={embedSize !== 'custom'}
            />
          </div>
          <div className="SourceSelector_embedField">
            <label className="SourceSelector_embedLabel">
              Height:
            </label>
            <input
              type="text"
              className="SourceSelector_embedInput"
              value={embedHeight}
              onChange={e => setEmbedHeight(e.target.value)}
              readOnly={embedSize !== 'custom'}
            />
          </div>
        </div>
        <div className="SourceSelector_embedCodeWrapper">
          <textarea
            className="SourceSelector_embedCode"
            value={embedCode}
            readOnly
          />
        </div>
        {this.renderSourceToggle('embed')}
      </div>
    );
  }
}

SourceSelector.propTypes = {
  selectedCategory: PropTypes.string,
  toggleCategory: PropTypes.func,
  match: PropTypes.object,
  location: PropTypes.object,
  surveySources: PropTypes.object,
  toggleSourceProp: PropTypes.func,
  embedSize: PropTypes.string,
  embedWidth: PropTypes.string,
  embedHeight: PropTypes.string,
  setEmbedSize: PropTypes.func,
  setEmbedWidth: PropTypes.func,
  setEmbedHeight: PropTypes.func,
  surveyMap: PropTypes.object
};

export default SourceSelector;

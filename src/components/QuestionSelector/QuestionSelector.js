import React from 'react';
import PropTypes from 'prop-types';

import './QuestionSelector.css';
import QuestionTypeList from '../QuestionTypeList/QuestionTypeList';
import SVGIcon from '../SVGIcon/SVGIcon';

export class QuestionSelector extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      previewImgName: 'default',
      previewTitle: '',
      previewDesc: '',
      previewAvailable: true
    };
  }

  showPreview(typeInfo) {
    this.setState({
      previewTitle: typeInfo.title,
      previewDesc: typeInfo.desc,
      previewImgName: typeInfo.imgId,
      previewAvailable: typeInfo.available
    });
  }

  clearPreview() {
    this.setState({
      previewTitle: '',
      previewDesc: '',
      previewImgName: 'default',
      previewAvailable: true
    });
  }

  render() {
    const { handleSelect } = this.props;

    return (
      <div
        className="QuestionSelector"
        style={{ visibility: 'hidden' }}>
        <div className="QuestionSelector_body">
          <div className="QuestionSelector_typeCol">
            <QuestionTypeList
              className="QuestionSelector_typeList"
              listTitle="List Questions"
              listType="list"
              showPreview={typeInfo => this.showPreview(typeInfo)}
              clearPreview={() => this.clearPreview()}
              onSelect={key => handleSelect(key)}
            />
            <QuestionTypeList
              className="QuestionSelector_typeList"
              listTitle="Matrix Questions"
              listType="matrix"
              showPreview={typeInfo => this.showPreview(typeInfo)}
              clearPreview={() => this.clearPreview()}
              onSelect={key => handleSelect(key)}
            />
            <QuestionTypeList
              className="QuestionSelector_typeList"
              listTitle="Other"
              listType="other"
              showPreview={typeInfo => this.showPreview(typeInfo)}
              clearPreview={() => this.clearPreview()}
              onSelect={key => handleSelect(key)}
            />
            <QuestionTypeList
              className="QuestionSelector_typeList"
              listTitle="Mobile App Questions"
              listType="mobile"
              showPreview={typeInfo => this.showPreview(typeInfo)}
              clearPreview={() => this.clearPreview()}
              onSelect={key => handleSelect(key)}
            />
            <p className="QuestionSelector_iconLegend">
              Coming Soon =
              <SVGIcon
                iconId="clock-lg"
                className="QuestionSelector_notReadyIcon"
              />
            </p>
          </div>
          <div className="QuestionSelector_preview">
            <h4 className="QuestionSelector_previewTitle">
              {this.state.previewTitle}
              {!this.state.previewAvailable && (
                <span className="QuestionSelector_previewComingSoon">
                  (Coming Soon!)
                </span>
              )}
            </h4>
            <p className="QuestionSelector_previewDesc">
              {this.state.previewDesc}
            </p>
            <img
              alt="Question Display Preview"
              src={`/assets/questionTypes/${this.state
                .previewImgName}.png`}
            />
          </div>
        </div>
      </div>
    );
  }
}

QuestionSelector.propTypes = {
  handleSelect: PropTypes.func,
  handleCancel: PropTypes.func
};

export default QuestionSelector;

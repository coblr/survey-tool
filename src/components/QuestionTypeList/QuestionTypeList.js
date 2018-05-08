import React from 'react';
import PropTypes from 'prop-types';

import QuestionConfig from '../../helpers/QuestionConfig.json';

import './QuestionTypeList.css';
import SVGIcon from '../SVGIcon/SVGIcon';

export class QuestionTypeList extends React.PureComponent {
  render() {
    const {
      className,
      listTitle,
      listType,
      showPreview,
      clearPreview,
      onSelect
    } = this.props;

    return (
      <div
        className={`QuestionTypeList ` + (className || '')}
        style={{ visibility: 'hidden' }}>
        <h5 className="QuestionTypeList_title">{listTitle}</h5>
        {QuestionConfig.filter(
          type => type.questionType === listType
        ).map((type, i) => (
          <button
            type="button"
            key={i}
            id={`btn_selectQuestType_${type.key}`}
            className="QuestionTypeList_selectBtn"
            onMouseOver={() => showPreview(type)}
            onMouseOut={() => clearPreview()}
            onClick={() => onSelect(type.key)}>
            {!type.available && (
              <SVGIcon
                iconId="clock-lg"
                className="QuestionTypeList_notReadyIcon"
              />
            )}
            {type.title}
          </button>
        ))}
      </div>
    );
  }
}

QuestionTypeList.propTypes = {
  className: PropTypes.string,
  listTitle: PropTypes.string,
  listType: PropTypes.string,
  showPreview: PropTypes.func,
  clearPreview: PropTypes.func,
  onSelect: PropTypes.func
};

export default QuestionTypeList;

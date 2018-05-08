import React from 'react';

export function getResponseLabelText(text) {
  return text.replace(/\[\[.+\]\]/, '');
}

export function getResponseLabel(text, includeInput) {
  return (
    <span>
      {getResponseLabelText(text)}

      {includeInput && <input readOnly="true" type="text" />}
    </span>
  );
}

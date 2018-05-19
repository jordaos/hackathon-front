import React from 'react';
import { FormText, FormGroup } from 'reactstrap';

class FormErrors extends React.Component {
  render() {
    return (
      <FormGroup>
        {Object.keys(this.props.formErrors).map((fieldName, i) => {
          if (this.props.formErrors[fieldName].length > 0) {
            return (
              <FormText key={i}>{this.props.formErrors[fieldName]}</FormText>
            )
          } else {
            return '';
          }
        })}
      </FormGroup>
    );
  }
}

export default FormErrors;
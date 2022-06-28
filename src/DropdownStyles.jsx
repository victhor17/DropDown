import styled, { css } from 'styled-components';

export const FieldAndIconContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: all ease 0.5s;
  margin-top: ${(props) => (props.margintop ? props.margintop : '0px')};
  & .inner-icon {
    position: absolute;
    right: 10px;
    top: 2px;
    bottom: 0px;
    margin: auto;
  }
  & .inner-icon-left {
    position: absolute;
    left: 10px;
    top: 2px;
    bottom: 0px;
    margin: auto;
  }
  & .inner-icon:hover,
  .inner-icon-left:hover {
    cursor: pointer;
  }
`;

export const SectionsLabel = styled.label`
  font-size: 0.8em;
  color: var(--color-grey-contrast);
  margin-bottom: 10px;
  font-weight: bold;
`;

export const InputField = styled.input(
  ({
    error = false,
    borderColor = error ? 'var(--color-danger)' : 'var(--color-grey-disabled)',
    radius = '4px',
    paddingleft = '1em',
    paddingright = '',
  }) => {
    return css`
      width: 100%;
      height: 3em;
      border: 1px solid ${borderColor};
      font-weight: 700;
      border-radius: ${radius};
      font-size: 1rem;
      padding-left: ${paddingleft};
      padding-right: ${paddingright};
      margin-top: 0.5em;
      color: var(--color-dark);
      -moz-appearance: textfield;
      transition: all ease 0.5s;
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      &::placeholder {
        color: var(--color-grey);
      }

      &:focus {
        outline: none;
        border: 1px solid ${borderColor};
        transition: all ease 0.5s;
      }
    `;
  }
);

export const RelativeContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const OptionsPopUp = styled.div`
  position: absolute;
  z-index: 1;
  background-color: var(--color-white);
  height: auto;
  margin-top: ${(props) => (props.margintop ? props.margintop : '3.2em')};
  min-height: 7em;
  min-width: ${(props) => (props.minwidth ? props.minwidth : '35em')};
  box-shadow: var(--shadow);
  border: solid 1px var(--color-white);
  border-radius: 0px;
  padding: ${(props) => (props.padding ? props.padding : '1em')};
  max-height: 300px;
  overflow-y: auto;
  width: 100%;
`;

export const TextOptions = styled.button(({ hidden = false }) => {
  return css`
    color: var(--color-grey-contrast);
    font-weight: bold;
    padding: 0.8rem;
    pointer-events: all;
    margin: 0px;
    cursor: pointer;
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    text-align: left;
    font-size: 1em;
    display: ${hidden && 'none'};
  `;
});

export const DropDownButton = styled.button`
  height: 100%;
  padding: ${(props) =>
    props.paddings ? props.paddings : '0.375rem 2rem 0.375rem 3rem'};
  text-align: left;
  cursor: pointer;
  box-shadow: var(--shadow);
  background-color: var(--color-white);
  border: solid 1px var(--color-white);
  border-radius: ${(props) => (props.radius ? props.radius : '0.25rem')};
  font-size: 1rem;
  color: var(--color-grey-contrast);
  font-weight: bold;
  font-size: 0.875rem;
  margin-right: 1rem;
  min-height: 3rem;
  width: ${(props) => (props.width ? props.width : '')};
  border: ${(props) =>
    props.error ? 'solid var(--color-danger) 1px' : 'none'};
`;

export const HiddenSelect = styled.select`
  display: none;
`;


export const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-column: span 2;
  margin-top: 1.5rem;
`;

export const TagLabel = styled.p`
  flex: 1;
  font-size: 0.75rem;
  font-weight: bold;
  line-height: 1.5rem;
  margin: 0.3125rem 0.75rem;
`;

export const TagContainer = styled.div`
  background-color: var(--color-white);
  border-radius: 0.25rem;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  margin-right: 1rem;
  padding-left: 0;
  padding: 0 0.8rem;
  width: fit-content;
`;

export const TagCloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const FormFieldErrorMessage = styled.label`
  color: var(--color-danger);
  display: block;
  font-size: 0.8rem;
  font-weight: bold;
  line-height: 1.25rem;
  margin-bottom: 0.5rem;
`;
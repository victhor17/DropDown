import React, { useState, useEffect, forwardRef } from 'react';
import { When } from 'react-if';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdAddTask,
} from 'react-icons/md';
import {
  DropDownButton,
  FieldAndIconContainer,
  InputField,
  OptionsPopUp,
  RelativeContainer,
  SectionsLabel,
  TextOptions,
  TagCloseButton,
  TagContainer,
  TagLabel,
  TagsList,
  FormFieldErrorMessage
} from './DropdownStyles';

const defaultGetOptionLabel = (option) => String(option.label);
const defaultGetOptionValue = (option) => String(option.value);

const Dropdown = forwardRef(
  (
    {
      labels = {},
      options,
      getOptionLabel = defaultGetOptionLabel,
      getOptionValue = defaultGetOptionValue,
      error = false,
      isMultiple = true,
      onChange = () => {},
      tagList = true,
      leftIcon = true,
      defaultValues = [],
      MainIcon = MdAddTask
    },
    ref
  ) => {
    const [openDropDown, setOpenDropDown] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [selectedOptionLabel, setSelectedOptionLabel] = useState(
      'Selecciona una opción'
    );
    const [filterText, setFilterText] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([...defaultValues]);

    const closeOptionsList = () => {
      setOpenDropDown(!openDropDown);
      setFilterText('');
    };

    const clearSelectValue = () => {
      if (ref?.current) {
        // eslint-disable-next-line no-param-reassign
        ref.current.value = '';
      }
    };

    const onSelectOption = (event) => {
      const selectedOptionValue = event.target.value;
      const selectedOption = options?.find(
        (option) => getOptionValue(option) === selectedOptionValue
      );
      const isAlreadySelected = isMultiple
        ? selectedOptions?.some(
            (option) => getOptionValue(option) === selectedOptionValue
          )
        : false;
      if (!isAlreadySelected && selectedOption) {
        const newSelectedOptions = isMultiple
          ? [...selectedOptions, selectedOption]
          : selectedOption;
        setSelectedOptions(newSelectedOptions);
        onChange(newSelectedOptions);
      }
      clearSelectValue();
    };

    const onRemoveOption = (optionToRemoveValue) => () => {
      const newSelectedOptions = selectedOptions?.filter(
        (option) => getOptionValue(option) !== optionToRemoveValue
      );
      setSelectedOptions(newSelectedOptions);
      onChange(newSelectedOptions);
    };

    // Se usa para el filtrado del campo 'buscar'
    useEffect(() => {
      if (filterText) {
        setFilteredOptions(
          options?.filter((option) => {
            return (
              option?.label?.toLowerCase()?.indexOf(filterText?.toLowerCase()) !==
              -1
            );
          })
        );
      } else {
        setFilteredOptions(options);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterText]);

    useEffect(() => {
      if (options) {
        setFilteredOptions(options);
      }
    }, [options]);

    const optionIsSelected = (optionToRender) => {
      return isMultiple
        ? selectedOptions?.some(
            (option) =>
              getOptionValue(option) === getOptionValue(optionToRender)
          )
        : false;
    };

    return (
      <div>
        <When condition={labels?.label}>
          <SectionsLabel htmlFor={labels?.name}>{labels?.label}</SectionsLabel>
        </When>
        <FieldAndIconContainer margintop=".5em">
          <When condition={leftIcon}>
            <MainIcon
              onClick={closeOptionsList}
              size="1.5em"
              color="#262e66"
              className="inner-icon-left"
            />
          </When>
          {openDropDown === false ? (
            <MdKeyboardArrowDown
              className="inner-icon"
              size="2em"
              onClick={closeOptionsList}
            />
          ) : (
            <MdKeyboardArrowUp
              className="inner-icon"
              size="2em"
              onClick={closeOptionsList}
            />
          )}
          <DropDownButton
            error={error}
            type="button"
            width="100%"
            radius=".25em .25em 0 0"
            ref={ref}
            onClick={closeOptionsList}
            paddings={!leftIcon ? '0.375rem 2rem 0.375rem 1.5rem' : ''}
          >
            {isMultiple ? 'Selecciona una opcion' : selectedOptionLabel}
          </DropDownButton>
          <When condition={error}>
            <FormFieldErrorMessage>{error}</FormFieldErrorMessage>
          </When>
        </FieldAndIconContainer>
        {openDropDown && (
          <RelativeContainer>
            <OptionsPopUp
              margintop="0px"
              minwidth="100%"
              padding="0em 1em 0px 1em"
              radius="0px"
            >
              <FieldAndIconContainer>
                <AiOutlineSearch className="inner-icon" size="1.5em" />
                <InputField
                  placeholder="Buscar..."
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </FieldAndIconContainer>
              {filteredOptions?.length ? (
                filteredOptions?.map((option) => (
                  <When
                    condition={!optionIsSelected(option)}
                    key={getOptionValue(option)}
                  >
                    <TextOptions
                      name={labels?.label}
                      value={getOptionValue(option)}
                      onClick={(e) => {
                        onSelectOption(e);
                        closeOptionsList();
                        if (!isMultiple) {
                          setSelectedOptionLabel(option.label);
                        }
                      }}
                    >
                      {getOptionLabel(option)}
                    </TextOptions>
                  </When>
                ))
              ) : (
                <TextOptions name={labels?.label} value="">
                  Sin Resultados
                </TextOptions>
              )}
            </OptionsPopUp>
          </RelativeContainer>
        )}
        <When condition={tagList}>
          <TagsList>
            {isMultiple &&
              selectedOptions?.map((option) => (
                <TagContainer key={getOptionValue(option)}>
                  <TagLabel>{getOptionLabel(option)}</TagLabel>
                  <TagCloseButton
                    onClick={onRemoveOption(getOptionValue(option))}
                  >
                    <AiOutlineClose />
                  </TagCloseButton>
                </TagContainer>
              ))}
          </TagsList>
        </When>
      </div>
    );
  }
);
export default Dropdown;

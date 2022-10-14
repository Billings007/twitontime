import { useField } from '@unform/core';
import { useEffect, useRef } from 'react';
import classNames from '@utils/classNames';

interface DefaultInputProps {
  name: string;
  label?: string;
  disabled?: boolean;
  type: 'text' | 'email' | 'password';
}

type InputProps = JSX.IntrinsicElements['input'] & DefaultInputProps;

export default function Input({ name, label, disabled, type, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, clearError, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <label className="flex flex-col group">
        <span className="font-semibold text-white group-focus-within:text-blue-400">{label}</span>
        <input
          id={fieldName}
          ref={inputRef}
          onFocus={clearError}
          defaultValue={defaultValue}
          required
          type={type}
          disabled={disabled}
          {...rest}
          className={classNames(
            error ? 'border-red-400' : 'border-gray-500',
            'w-full py-2 border-2 rounded-xl focus:ring-4 focus-visible:ring-blue-400 outline-none duration-300 ease-out bg-blue-400/10 focus-within:bg-white disabled:bg-gray-500/50 px-3'
          )}
        />
      </label>
      <span className="text-sm text-red-400">{error}</span>
    </>
  );
}

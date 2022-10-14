import { useField } from '@unform/core';
import { useEffect, useRef } from 'react';
import classNames from '@utils/classNames';

interface DefaultTextAreaProps {
  name: string;
  label?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

type TextAreaProps = JSX.IntrinsicElements['textarea'] & DefaultTextAreaProps;

export default function TextArea({ name, label, disabled, onChange }: TextAreaProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
      <label className="flex flex-col group space-y-2">
        <span className="font-semibold group-focus-within:text-blue-400">{label}</span>
        <textarea
          id={fieldName}
          ref={inputRef}
          onFocus={clearError}
          defaultValue={defaultValue}
          onChange={onChange}
          required
          disabled={disabled}
          rows={4}
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

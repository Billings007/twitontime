import classNames from '@utils/classNames';
import { ForwardedRef, forwardRef, HTMLInputTypeAttribute } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps {
  name: string;
  label?: string;
  type: HTMLInputTypeAttribute;
  disabled?: boolean;
  error?: FieldError;
}

const Input = forwardRef(
  ({ name, label, type, disabled, error, ...rest }: InputProps, ref: ForwardedRef<null>) => (
    <>
      <label className="flex flex-col group">
        <span className="font-semibold text-gray group-focus-within:text-secondary">{label}</span>
        <div className="relative">
          <input
            ref={ref}
            name={name}
            required
            type={type}
            disabled={disabled}
            {...rest}
            className={classNames(
              error ? 'border-red' : 'border-gray-light',
              type === 'email' ? 'px-10' : 'px-3',
              'w-full py-2 border-2 rounded-xl focus:ring-4 focus-visible:ring-secondary-light outline-none duration-300 ease-out bg-secondary-light/10 focus-within:bg-white disabled:bg-gray-light/50'
            )}
          />
          {type === 'email' && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none select-none">
              <svg
                aria-hidden
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-gray-light"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>
      </label>
      <span className="text-sm text-red">{error?.message}</span>
    </>
  )
);

export default Input;

Input.displayName = 'Input';

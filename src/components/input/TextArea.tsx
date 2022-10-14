import classNames from '@utils/classNames';
import { Controller, FieldError, FieldValues, UseControllerProps } from 'react-hook-form';

interface TextAreaProps<T extends FieldValues> extends UseControllerProps<T> {
  label?: string;
  error: FieldError | undefined;
  value?: string;
}

const TextAreaInput = <T extends FieldValues>({
  name,
  label,
  control,
  error,
  value,
  defaultValue,
}: TextAreaProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange } }) => (
        <>
          <label className="flex flex-col space-y-2">
            <span className="sr-only">{label}</span>
            <textarea
              id="textarea"
              name={name}
              value={value}
              onChange={onChange}
              required
              rows={5}
              className={classNames(
                error ? 'ring-red-400' : 'ring-gray-400',
                'w-full rounded-md ring-offset-2 ring-4 sm:w-96 outline-none focus:ring-blue-200 p-2'
              )}
            />
            <span className="text-red-500">{error?.message}</span>
          </label>
        </>
      )}
    ></Controller>
  );
};

export default TextAreaInput;

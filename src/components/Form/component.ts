import type {
  AutoCompleteProps,
  CascaderProps,
  CheckboxGroupProps,
  CheckboxProps,
  DatePickerProps,
  DividerProps,
  InputNumberProps,
  InputProps,
  RadioGroupProps,
  RateProps,
  SelectProps,
  SliderProps,
  SwitchProps,
  TimePickerProps,
  TreeProps,
  TreeSelectProps,
  UploadProps,
} from 'naive-ui';
import type { FormActionType, FormSchema } from './types';

export interface FormComponentProps {
  schema: FormSchema;
  formModel: any;
  formActionType: FormActionType;
}

interface ApiProps {
  api: () => Promise<any>; // 请求方法
  params?: any; // 请求参数
  immediate?: boolean; // 是否立即请求
  resultField?: string; // 从返回结果中取出的字段
  queryField?: string; // 查询字段
}

type ComponentProps<T> = T | ((arg: FormComponentProps) => T);

interface NInput {
  component: 'NInput';
  componentProps?: ComponentProps<InputProps>;
}

interface NIconPicker {
  component: 'NIconPicker';
  componentProps?: ComponentProps<InputProps>;
}

interface NInputNumber {
  component: 'NInputNumber';
  componentProps?: ComponentProps<InputNumberProps>;
}

interface NSelect {
  component: 'NSelect';
  componentProps?: ComponentProps<SelectProps>;
}

interface NTreeSelect {
  component: 'NTreeSelect';
  componentProps?: ComponentProps<TreeSelectProps>;
}

interface ApiSelect {
  component: 'ApiSelect';
  componentProps?: ComponentProps<SelectProps & ApiProps>;
}

interface NTree {
  component: 'NTree';
  componentProps?: ComponentProps<TreeProps>;
}

interface ApiTree {
  component: 'ApiTree';
  componentProps?: ComponentProps<
    TreeProps &
      ApiProps & {
        afterFetch?: any;
        defaultCheckedKeys?: (string | number)[];
      }
  >;
}

interface ApiTreeSelect {
  component: 'ApiTreeSelect';
  componentProps?: ComponentProps<TreeSelectProps & ApiProps>;
}

interface Upload {
  component: 'Upload';
  componentProps?: ComponentProps<
    UploadProps & { type?: string[]; api?: (options: UploadFileParams) => void }
  >;
}

interface NRadioGroup {
  component: 'NRadioGroup';
  componentProps?: ComponentProps<
    RadioGroupProps & {
      type?: String;
      options: OptionsItem[];
    }
  >;
}

interface NCheckbox {
  component: 'NCheckbox';
  componentProps?: ComponentProps<CheckboxProps>;
}

interface NCheckboxGroup {
  component: 'NCheckboxGroup';
  componentProps?: ComponentProps<CheckboxGroupProps>;
}

interface AutoComplete {
  component: 'AutoComplete';
  componentProps?: ComponentProps<
    AutoCompleteProps &
      ApiProps & { labelField?: string; valueField?: string; allOptions?: boolean }
  >;
}

interface NCascader {
  component: 'NCascader';
  componentProps?: ComponentProps<CascaderProps>;
}

interface NDatePicker {
  component: 'NDatePicker';
  componentProps?: ComponentProps<DatePickerProps>;
}

interface NTimePicker {
  component: 'NTimePicker';
  componentProps?: ComponentProps<TimePickerProps>;
}

interface NSwitch {
  component: 'NSwitch';
  componentProps?: ComponentProps<SwitchProps>;
}

interface NSlider {
  component: 'NSlider';
  componentProps?: ComponentProps<SliderProps>;
}

interface NDivider {
  component: 'NDivider';
  componentProps?: ComponentProps<DividerProps>;
}

interface NRate {
  component: 'NRate';
  componentProps?: ComponentProps<RateProps>;
}

export type ComponentMap =
  | NInput
  | NInputNumber
  | NSelect
  | ApiSelect
  | NIconPicker
  | NTreeSelect
  | NTree
  | ApiTree
  | ApiTreeSelect
  | NRadioGroup
  | NCheckbox
  | NCheckboxGroup
  | NCascader
  | NDatePicker
  | NTimePicker
  | NSwitch
  | NSlider
  | NDivider
  | NRate
  | Upload
  | AutoComplete;

export type ComponentType = Pick<ComponentMap, 'component'>['component'];

export type OptionsItem = { label: string; value: string | number | boolean; disabled?: boolean };

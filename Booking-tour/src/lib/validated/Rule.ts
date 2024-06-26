import { RuleObject } from "antd/es/form";

export interface ValidationRulesInterface {
  requireFormCharacterLimit(max: number): RuleObject;
  requireForm(): RuleObject;
  requireCheckBox(): RuleObject;
  emailValidation(): RuleObject;
  validateLettersOnly(_: RuleObject, value: string): Promise<void>;
  acceptNumbersOnly(): RuleObject;
  phoneValidate(): RuleObject;
}

class ValidationRules implements ValidationRulesInterface {
  requireFormCharacterLimit(max: number): RuleObject {
    return { max, message: `Please enter within ${max} characters.` };
  }
  requireCheckBox(): RuleObject {
    return {
      required: true,
      message: "Không được để trống trường này!",
      type: "boolean",
      transform: (value) => value || undefined,
    };
  }
  requireForm(): RuleObject {
    return { required: true, message: "Không được để trống trường này!" };
  }

  emailValidation(): RuleObject {
    return { type: "email", message: "Vui lòng nhập đúng định dạng email" };
  }

  validateLettersOnly(_: RuleObject, value: string) {
    const lettersOnly = /^[A-Za-z\s]+$/;
    if (value && !lettersOnly.test(value)) {
      return Promise.reject(
        new Error("Please enter a valid name containing only letters.")
      );
    }
    return Promise.resolve();
  }
  acceptNumbersOnly(): RuleObject {
    return {
      pattern: /^[0-9]*$/,
      message: "Please enter numbers only.",
    };
  }
  phoneValidate(): RuleObject {
    return {
      pattern: /^\d{8}$/,
      message: "Nhập đầy đủ 8 số",
    };
  }
}
const validationRulesInstance: ValidationRulesInterface = new ValidationRules();
export default validationRulesInstance;

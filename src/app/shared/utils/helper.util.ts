// import { OnboardingStep } from "../../../interfaces";

export function doesExist(value: any) {
	return typeof value !== "undefined" && value !== null;
}

export function debounce(func: Function, wait: number, immediate: boolean) {
	let timeout: any;
	return function (this: any, ...args: any[]) {
		const context = this;
		const later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

// export function getAuthRedirect(status: string, returnUrl: string = null) {
//   const pathname = "/onboarding";

//   if (!status) return pathname;
//   return status === OnboardingStep.Welcome
//     ? `${pathname}/profile`
//     : status === OnboardingStep.Profile
//     ? `${pathname}/availability`
//     : status === OnboardingStep.Availability
//     ? `${pathname}/organization`
//     : returnUrl || "/calendar";
// }

export function getPropertyValue<T>(
	object: { [key: string]: any },
	propertyPath: string,
	defaultValue: any = null
): T {
	return doesObjectContainProperty(object, propertyPath)
		? propertyPath.split(".").reduce((previous, current) => {
				return previous[current];
		  }, object)
		: defaultValue;
}

export function doesObjectContainProperty(
	object: { [key: string]: any },
	propertyPath: string
): boolean {
	// If there's nothing to check
	if (typeof object !== "object" || !object || !Object.keys(object).length) {
		return false;
	}

	// If there's nothing to check
	if (!propertyPath?.length) {
		return false;
	}

	try {
		// Iterate through propertyPath to dig into the object
		const finalValue = propertyPath
			.split(".")
			.reduce((previous, current) => {
				// No hasOwnProperty check
				return typeof previous !== "undefined" && previous !== null
					? previous[current]
					: undefined;
			}, object);
		// We specifically want to check for undefined & null to check if value exist here
		return typeof finalValue !== "undefined" && finalValue !== null;
	} catch (error) {
		// If the path has a wrong turn, the reduce function will throw an error
		return false;
	}
}

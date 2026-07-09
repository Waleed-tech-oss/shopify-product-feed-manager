export function validateFeed(data) {
  const errors = {};

  // Feed Name
  if (!data.feedName || data.feedName.trim() === "") {
    errors.feedName = "Feed name is required.";
  }


  if (!data.channel) {
    errors.channel = "Channel is required.";
  } else if (!["google", "meta", "tiktok"].includes(data.channel)) {
    errors.channel = "Invalid channel.";
  }

  // Format
  if (!data.format) {
    errors.format = "Feed format is required.";
  } else if (!["XML", "CSV"].includes(data.format)) {
    errors.format = "Invalid feed format.";
  }

  // Currency
  if (!data.currency || data.currency.trim() === "") {
    errors.currency = "Currency is required.";
  }

  // Language
  if (!data.language || data.language.trim() === "") {
    errors.language = "Language is required.";
  }

  // Country
  if (!data.country || data.country.trim() === "") {
    errors.country = "Country is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
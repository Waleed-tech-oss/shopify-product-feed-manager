import { Form } from "react-router";

import { currencies } from "../constants/currencies";
import { countries } from "../constants/countries";
import { languages } from "../constants/languages";

export default function EditFeedModal({
  feed,
  onClose,
}) {
  if (!feed) return null;

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Edit Feed</h2>

        <Form method="post">

          <input
            type="hidden"
            name="action"
            value="edit"
          />

          <input
            type="hidden"
            name="feedId"
            value={feed._id}
          />

          <div className="form-group">
            <label>Feed Name</label>

            <input
              type="text"
              name="feedName"
              defaultValue={feed.feedName}
              required
            />
          </div>

          <div className="form-group">
            <label>Format</label>

            <select
              name="format"
              defaultValue={feed.format}
            >
              <option value="XML">XML</option>
              <option value="CSV">CSV</option>
            </select>
          </div>

          <div className="form-group">
            <label>Currency</label>

            <select
              name="currency"
              defaultValue={feed.currency}
            >
              {currencies.map((currency) => (
                <option
                  key={currency}
                  value={currency}
                >
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Language</label>

            <select
              name="language"
              defaultValue={feed.language}
            >
              {languages.map((language) => (
                <option
                  key={language.code}
                  value={language.code}
                >
                  {language.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Country</label>

            <select
              name="country"
              defaultValue={feed.country}
            >
              {countries.map((country) => (
                <option
                  key={country.code}
                  value={country.code}
                >
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Default Category</label>

            <input
              type="text"
              name="defaultCategory"
              defaultValue={feed.defaultCategory}
            />
          </div>

          <div className="checkbox-group">

            <label>

              <input
                type="checkbox"
                name="includeOutOfStock"
                defaultChecked={
                  feed.includeOutOfStock
                }
              />

              Include Out of Stock

            </label>

          </div>

          <div className="checkbox-group">

            <label>

              <input
                type="checkbox"
                name="isActive"
                defaultChecked={feed.isActive}
              />

              Feed Active

            </label>

          </div>

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-btn"
            >
              Save Changes
            </button>

          </div>

        </Form>

      </div>

    </div>
  );
}
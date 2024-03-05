import React from "react";
import Wrapper from "../Wrapper";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import InputField from "../InputField";
import DropdownField from "../DropdownField";

function UserSelectForm() {
  const { user, setSelection } = useUserContext();
  const navigate = useNavigate();
  const [historySearch, setHistorySearch] = React.useState({
    where: "",
    when: "",
    interest: "",
  });


  const handleInputChange = (value, key) => {
    setHistorySearch((previsonHistorySearch) => ({
      ...previsonHistorySearch,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // check for empty fields, prevent submit if there are any empty fields
    if (Object.values(historySearch).some((field) => field === "")) {
      return;
    }
    
    setSelection(historySearch.where, historySearch.when, historySearch.interest);
    navigate("../history");
  };
  return (
    <Wrapper className="bg-light-blue">
      <form
        onSubmit={handleSubmit}
        className="flex h-full justify-center flex-col items-center p-3 border rounded border-light-blue shadow-md bg-white"
      >
        <div className="text-center mb-4">
          {user && <h1 className="text-dark-green text-3xl font-bold mb-1">Hi, {user.name}</h1>}
        </div>
        <div className="mx-auto w-4/5 mt-3">
          <InputField
            inputId={"where"}
            inputLabel="Where would you like to go?"
            inputType="text"
            placeholder="China"
            value={historySearch.location}
            handleInputChange={(e) =>
              handleInputChange(e.target.value, "where")
            }
            required
          />

          <DropdownField
            currentOption={historySearch.season}
            dropdownOptions={["Summer", "Winter", "Spring", "Autumn"]}
            selectOption={(option) => handleInputChange(option, "when")}
            placeholder="When would you like to visit?"
            optionPlaceholder="Select a season"
          />

          <InputField
            inputId={"interest"}
            inputLabel="What are you interested in?"
            inputType="text"
            placeholder="Fashion"
            value={historySearch.interest}
            handleInputChange={(e) =>
              handleInputChange(e.target.value, "interest")
            }
            required
          />
          <button
            type="submit"
            className="text-white bg-dark-green hover:bg-bright-blue focus:ring-4 focus:outline-none focus:ring-bright-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full mt-3 transition-colors duration-200"
          >
            Search
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default UserSelectForm;

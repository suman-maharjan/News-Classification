import { PropTypes } from "prop-types";

const TabComponent = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="root flex flex-start p-4 bg-gray-600 justify-center rounded-md">
      {tabs.map((tab, index) => {
        return (
          <div
            key={index}
            className={`tab text-white ${
              activeTab === tab ? "text-gray-600 bg-white  rounded-md" : ""
            }`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </div>
        );
      })}
    </div>
  );
};

TabComponent.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default TabComponent;

interface TabComponentProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabComponent = ({ tabs, activeTab, onTabChange }: TabComponentProps) => {
  return (
    <div className="root flex flex-start p-4 bg-gray-600 justify-center rounded-md">
      {tabs.map((tab, index) => {
        return (
          <div
            key={index}
            className={`tab  ${
              activeTab === tab
                ? "text-gray-600 bg-white  rounded-md"
                : "text-white"
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

export default TabComponent;

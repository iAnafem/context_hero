import React from "react";
import { observer, Provider } from "mobx-react";
import { StudyCards } from "./applications/study_cards/StudyCards";
import CreateCard from "./applications/create_card/CreateCard";

const App = observer(() => {
  return (
    <Provider store>
      <div>
        <StudyCards />
        <CreateCard />
      </div>
    </Provider>
  );
});

export default App;

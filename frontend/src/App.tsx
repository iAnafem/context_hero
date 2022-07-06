import React from "react";
import { observer, Provider } from "mobx-react";
import { StudyCards } from "./applications/study_cards/StudyCards";
import CreateCard from "./applications/create_card";

const App = observer(() => {
  return (
    <Provider store>
      <div>
        <StudyCards />
        <div style={{ margin: 100 }} />
        <CreateCard />
      </div>
    </Provider>
  );
});

export default App;

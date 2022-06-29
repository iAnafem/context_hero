import React from "react";
import { observer, Provider } from "mobx-react";
import { StudyCards } from "./applications/study_cards/StudyCards";

const App = observer(() => {
  return (
    <Provider store>
      <div>
        <StudyCards />
      </div>
    </Provider>
  );
});

export default App;

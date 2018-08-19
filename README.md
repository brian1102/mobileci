 Yojee Driver App
================
# 1. Installation

First, please make get ready with React Native with [official document.](https://facebook.github.io/react-native/docs/getting-started.html)

### Step 1:

Clone the repo, then run:

```
yarn install
```

After that, navigate to ios then:

```
pod install
```

After done with pod stuffs, navigate to root (optional):

```
brew cask install react-native-debugger
```

### Step 2:

###### Run IOS:

 Open xcode, choose the scheme and just hit the run button.

###### Run Android:

YojeeDev:

```
npm run debugYojeeDev
```

YojeeStaging:

```
npm run debugYojeeStaging
```

YojeeProd:

```
npm run debugYojeeProd
```

# 2. Fastlane Actions
### iOS
###### YojeeDev fabric deployment
```
yarn run fabricIosYojeeDev
```
###### YojeeStating fabric deployment
```
yarn run fabricIosYojeeStating
```
###### YojeeProd fabric deployment
```
yarn run fabricIosYojeeProd
```

#### Android
###### YojeeDev fabric deployment
```
yarn run fabricAndroidYojeeDev
```
###### YojeeStaging fabric deployment
```
yarn run fabricAndroidYojeeStating
```
###### YojeeProd  fabric deployment
```
yarn run fabricAndroidYojeeProd
```
# 3. Contribution's guide

#### 3.1. Git flow
* Fork this repo
* Clone your own forked repo
* Inside your own forked repo, add this repo as your remote upstream by 
```
git remote add upstream git@github.com:yojee/driver-react-native.git
```
* Create your own branch on local with prefix `f/id-of-jira-issue-name-ofbranch`, example: `f/YC-205-status-ui-improvement`
* After done stuff, create a PR

#### 3.2 Rules
We're under refactoring so you might be confused by the some of difference code's styles. But don't be panic. We're making a lot of changes that including coding styles updates.

We're using module oriented designing, for each module, we will try to put the reducers, selectors, all the sagas and action types inside it. Mean that reducer files, selectors, sagas, action types are in the same folder with the UI screen and another `local components`.

For example:

`IncomingTasksModal`
----actionTypes.js
----incomingTask.reducer.js
----InComingTask.modal.js
----selectors.js
----TaskGroupContent.component.js
----`sagas`
    -------acceptTaskGroup.sagas.js
    -------incomingTask.sagas.js
    -------index.js

So we have some `naming rules` here:

- **RN1**: folder, file' name has to be written in camel case.
- **RN2**: variable, const, object, object's field, etc have to be named in camel case.
- **RN3**: sagas file's name has to be ended with `.saga.js`, the first letter has to be in lower case.
- **RN4**: reducer file's name has to be ended with `.reducer.js`, the first letter has to be in lower case.
- **RN5**: modal file's name has to be ended with `.modal.js`, It will be an `UI` part, so the first letter has to be in upper case.
- **RN6**: for screen file that connect to redux, it's name has to be end with `.screen.js`, It will be an `UI` part, so the first letter has to be in upper case  too.
- **RN7**:  for components that that isn't connected to redux, it's name has to be end with `.component.js`, It will be an `UI` part, so the first letter has to be in upper case too.

Next we also have some `placing rules`:
- **RP1**: if you need only 1 component, no need to create components folder. Otherwise you have to create components folder that contain all your components.
- **RP2**: if you need only 1 saga, no need to create your sagas folder. Otherwise you have to create sagas folder that contain all your sagas file. You also have to create one index files, that combine all your saga to an array.
- **RP3**: You have to put your images/assets in the `src/resources/xxx` folder. `xxx` will be icon, etc.

Let's move on to `how to create an action`:
- **RA.Step 1**: create an actionTypes.js file that export all your action types. You have to define your module's name space like `yojee/yourmodule/YOUR_ACTION_NAME`
- **RA.Step 2**: just register your actionTypes.js in the root actionType at `src/state/actionsType.js`.

Next, we should know `how to  use an action`:
- **RA.Step 1**: import all your action from root as `a` variable. Import action types root as `t` variable. 
```
import a from 'src/actions'
import * as t from 'src/actionsType'
```
- **RA.Step 2**: dispatch an action:
```
dispatch(a[t.YOUR_ACTION](yourPayload))
```

Time to go get used to with `how to define and use selector`:
- **RS.Step 1**: Register your selectors in `src/state/selectors.js`. 

- **RS.Step 2**: Import selector root as `s` variable. 
```
import * as s from 'src/selectors'

s.yourSelector(state)
```

Ok seem everything's a bit more clear now, the last one is `rules to deal with sagas`:

- **RSG.1**: One saga file will only work with only 1 stuff. 

- **RSG.2**: One saga that deal with network or do a specific stuff that can throw an error will has 3 actions: `DOTHING`, `DOTHING_SUCCESS`, `DO_THING_FAILED`. 

- **RSG.3**: A saga that define a flow that has many steps has to be wrap in a `saga chain`. See `startUp.chain.saga`. 

----
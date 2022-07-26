const addUserHTML = `
<div>
    <h2>Add a new user</h2>
    <div class="form">
      <div class="inputDiv">
        <label class="labels" for="firstName">first name</label><br/>
        <input class="inputs" type="text" id="adminAddFirstName" name="firstName"><br>
      </div>
      <div class="inputDiv">
        <label class="labels" for="lastName">last name</label><br/>
        <input class="inputs" type="text" id="adminAddLastName" name="lastName"><br>
      </div>
      <div class="inputDiv">
        <label class="labels" for="email">email</label><br/>
        <input class="inputs" type="email" id="adminAddEmail" name="email"><br>
      </div>
      <label class="labels" for="permission">Select a permission</label>
      <select id="adminAddPermission" name="permission" for="permission">
        <option value="owner">owner</option>
        <option value="admin">admin</option>
        <option value="editor">editor</option>
        <option value="viewer">viewer</option>
      </select>
      <div id="regiBtnDiv">
        <button id="adminAddBtn" class="loginRegiBtn">ADD USER</button>
      </div>
    </div>
  </div>
`;
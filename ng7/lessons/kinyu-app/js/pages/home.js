import { apiGetLendings } from "../api/apiGetLendings.js";

function ErroBanner(error) {
  return `<hgroup>
              <h2>Error Loading Lendings</h2>
              <p>${error.message}</p>
            </hgroup>`;
}

function lendingHtml(lending) {
  return `<tr>
              <td>${lending.who}</td>
              <td>${lending.type}</td>
              <td>${lending.details}</td>
              <td><a href="/details#${lending.id}">View</a></td>
            </tr>`;
}

function LendingTable(lendings) {
  const lendingList = lendings.map(lendingHtml).join("");
  return `<table>
              <thead>
                <tr>
                  <th>Who</th>
                  <th>Type</th>
                  <th>Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${lendingList}
              </tbody>
            </table>`;
}

export default async function render() {
  const { data, error } = await apiGetLendings();

  if (error) {
    document.getElementById("app").innerHTML = ErroBanner(error);
    return;
  }

  document.getElementById("app").innerHTML = LendingTable(data);
}

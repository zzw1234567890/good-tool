import { myfetch } from "@utils/fetch";

{{
  routeData.map(({ url, method, methodName }) => {
    if (method === "get") {
      return `
const ${methodName} = state => () =>
  myfetch({
    state,
    url: "${url}"
  });
`;
    }
    return `
const ${methodName} = values => () =>
  myfetch({
    url: "${url}",
    options: {
      method: "${method}",
      body: JSON.stringify(values)
    }
  });
`;
  }).join("").slice(1, -1);
}}

export {{`{
${routeData.map(({methodName}) => `  ${methodName},
`).join("").slice(0, -2)}
}`}};
const tpl = `import { myfetch } from "@utils/fetch";

{{
  routeData.map(({ url, method, methodName }) => {
    if (method === "get") {
      return \`
const \${methodName} = stateId => () =>
  myfetch({
    stateId,
    url: "\${url}"
  });
\`;
    }
    return \`
const \${methodName} = values => () =>
  myfetch({
    url: "\${url}",
    options: {
      method: "\${method}",
      body: JSON.stringify(values)
    }
  });
\`;
  }).join("").slice(1, -1);
}}

export {{\`{\n\${routeData.map(({methodName}) => \`  \${methodName},\n\`).join("").slice(0, -2)}\n}\`}};`;

module.exports = { tpl };

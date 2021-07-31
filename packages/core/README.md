# CODEF

code define, define your code!

## Usage

### define Plugin

```javascript
import { definePlugin } from "codef"

const plugin = definePlugin((context, options) => {
  const { registerCommand, registerTemplate } = context;
  
  // TODO
})

export default plugin
```

### codef.config.js

```typescript

import { defineConfig } from "codef"

// ts
export default defineConfig({
  plugins: [
    creatorPlugin.install(options),
    vuePlugin.install(options),
  ]
})

```

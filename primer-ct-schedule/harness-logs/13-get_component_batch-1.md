# get_component_batch

- args: `{"names":["Avatar","Checkbox","FormControl","Spinner","Stack","Text","Heading","PageLayout","Label","StateLabel"]}`
- isError: false
- ms: 521
- chars: 49878

---

---
name: Avatar
description: "Avatar is an image that represents a user or organization."
import: "@primer/react"
docs: https://primer.style/product/components/avatar
a11y_docs: https://primer.style/product/components/avatar/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Avatar
storybook: https://primer.style/react/storybook/?path=/story/components-avatar
---

# Avatar

Avatar is an image that represents a user or organization.

## Usage

```tsx
import { Avatar } from '@primer/react'
```

### Example

```tsx
() => <Avatar src="https://avatars.githubusercontent.com/u/7143434?v=4" />
```

## Props

```yaml
Avatar:
  alt: { type: "string", default: "''", description: "Provide alt text when the avatar is used without a name next to it." }
  size: { type: "number | { narrow?: number; regular?: number; wide?: number; }", default: "20", description: "The size of the avatar in pixels." }
  square: { type: "boolean", default: "false", description: "If true, the avatar will be square instead of circular." }
  src: { type: "string", description: "URL of the avatar image." }
```

## Examples

### Features: Square

```tsx
() => (
  <Avatar
    square
    alt="primer"
    src="https://avatars.githubusercontent.com/u/7143434?v=4"
  />
)
```

### Features: Size

```tsx
() => (
  <div>
    <Avatar
      size={4}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      size={8}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      size={12}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      size={16}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      size={20}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      size={24}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      size={28}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      size={32}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      size={40}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      size={48}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      size={56}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      size={64}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
  </div>
)
```

### Features: Size Responsive

```tsx
() => (
  <div>
    <Avatar
      size={{
        narrow: 4,
        regular: 8,
        wide: 12,
      }}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      size={{
        narrow: 8,
        regular: 12,
        wide: 16,
      }}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      size={{
        narrow: 12,
        regular: 16,
        wide: 20,
      }}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      size={{
        narrow: 16,
        regular: 20,
        wide: 24,
      }}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      size={{
        narrow: 20,
        regular: 24,
        wide: 28,
      }}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      size={{
        narrow: 24,
        regular: 28,
        wide: 32,
      }}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      size={{
        narrow: 28,
        regular: 32,
        wide: 40,
      }}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      size={{
        narrow: 32,
        regular: 40,
        wide: 48,
      }}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      size={{
        narrow: 40,
        regular: 48,
        wide: 56,
      }}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      size={{
        narrow: 48,
        regular: 56,
        wide: 64,
      }}
      alt="mona"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
  </div>
)
```
---
name: Checkbox
description: "Checkbox is a form control for single and multiple selections."
import: "@primer/react"
docs: https://primer.style/product/components/checkbox
a11y_docs: https://primer.style/product/components/checkbox/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Checkbox
storybook: https://primer.style/react/storybook/?path=/story/components-checkbox
---

# Checkbox

Checkbox is a form control for single and multiple selections.

## Usage

```tsx
import { Checkbox } from '@primer/react'
```

### Example

```tsx
() => (
  <form>
    <FormControl>
      <Checkbox value="default" />
      <FormControl.Label>Default label</FormControl.Label>
    </FormControl>
  </form>
)
```

## Props

```yaml
Checkbox:
  checked: { type: "boolean", description: "Modifies true/false value of the native checkbox" }
  defaultChecked: { type: "boolean", description: "Checks the input by default in uncontrolled mode" }
  disabled: { type: "boolean", description: "Modifies the native disabled state of the native checkbox" }
  indeterminate: { type: "boolean", default: "false", description: "Applies an [indeterminate state](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#attr-indetermi..." }
  onChange: { type: "(event: React.ChangeEvent) => void", description: "A callback function that is triggered when the checked state has been changed" }
  validationStatus: { type: "'error' | 'success'", description: "Only used to inform ARIA attributes. Individual checkboxes do not have validation styles." }
  value: { type: "string", description: "A unique value that is never shown to the user. Used during form submission and to identify which checkbox inputs are se..." }
  ref: { type: "React.RefObject<HTMLInputElement>" }
  as: { type: "React.ElementType", default: "'input'" }
```

## Examples

### Features: With Leading Visual

```tsx
() => {
  return (
    <form>
      <FormControl>
        <FormControl.LeadingVisual>
          <MarkGithubIcon />
        </FormControl.LeadingVisual>
        <Checkbox value="default" />
        <FormControl.Label>Default label</FormControl.Label>
      </FormControl>
    </form>
  )
}
```

### Features: Disabled

```tsx
() => {
  return (
    <form>
      <FormControl disabled>
        <Checkbox value="default" />
        <FormControl.Label>Default label</FormControl.Label>
      </FormControl>
    </form>
  )
}
```

### Features: With Caption

```tsx
() => {
  return (
    <form>
      <FormControl>
        <Checkbox value="default" />
        <FormControl.Label>Default label</FormControl.Label>
        <FormControl.Caption>This is a caption</FormControl.Caption>
      </FormControl>
    </form>
  )
}
```
---
name: FormControl
description: "FormControl displays a labelled input and, optionally, associated validation text and/or hint text."
import: "@primer/react"
docs: https://primer.style/product/components/form-control
a11y_docs: https://primer.style/product/components/form-control/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/FormControl
storybook: https://primer.style/react/storybook/?path=/story/components-form-control
---

# FormControl

FormControl displays a labelled input and, optionally, associated validation text and/or hint text.

## Usage

```tsx
import { FormControl } from '@primer/react'
```

### Example

```tsx
() => (
  <FormControl required={true}>
    <FormControl.Label>Form Input Label</FormControl.Label>
    <FormControl.Caption>This is a caption</FormControl.Caption>
    <Checkbox />
  </FormControl>
)
```

## Props

```yaml
FormControl:
  children: { type: "FormControl.Label | FormControl.Caption | FormControl.Validation | Autocomplete | TextInput | TextInputWithTokens | Select", required: true }
  disabled: { type: "boolean", default: "false", description: "Whether the control allows user input" }
  id: { type: "string", default: "a generated string", description: "The unique identifier for this control. Used to associate the label, validation text, and caption text" }
  required: { type: "boolean", default: "false", description: "If true, the user must specify a value for the input before the owning form can be submitted" }
  id: { type: "string", description: "The unique identifier for this control. Used to associate the label, validation text, and caption text" }
  layout: { type: "'vertical' | 'horizontal'", default: "vertical", description: "The direction the content flows. Vertical layout is used by default, and horizontal layout is used for checkbox and radi..." }
  className: { type: "string", description: "Class name(s) for custom styling." }
  ref: { type: "React.RefObject<HTMLDivElement>" }

FormControl.Label:
  visuallyHidden: { type: "boolean", default: "false", description: "Whether the label should be visually hidden" }
  as: { type: "'label' | 'legend' | 'span'", default: "'label'", description: "The label element can be changed to a 'legend' when it's being used to label a fieldset, or a 'span' when it's being use..." }
  requiredText: { type: "string", default: "'*'", description: "The text to display when the field is required" }
  requiredIndicator: { type: "boolean", default: "true", description: "Whether to show or hide the required text in the accessibility tree, the required text is still shown visually." }
  htmlFor: { type: "string", description: "This prop may be used to override the `htmlFor` set from FormControl's React Context. The unique identifier for the asso..." }
  id: { type: "string", description: "When `as` prop is 'label', it may be used to override the `htmlFor` given to the `<label>` element by FormControl's Reac..." }
  className: { type: "string", description: "Class name(s) for custom styling." }

FormControl.Caption:
  id: { type: "string", description: "Custom ID to override the ID set by FormControl's React Context" }
  children: { type: "React.ReactNode", description: "The content (usually just text) that is rendered to give contextual info about the field" }

FormControl.Validation:
  children: { type: "React.ReactNode", description: "The content (usually just text) that is rendered to give contextual info about the validation result for the field" }
  variant: { type: "'error' | 'success'", required: true, description: "Changes the visual style to match the validation status" }
  id: { type: "string", description: "May be used to override the ID assigned by FormControl's React Context" }

FormControl.LeadingVisual:
  children: { type: "React.ReactNode", description: "The visual to render before the choice input's label" }
```

## Examples

### Features: With Complex Inputs

```tsx
() => {
  const [tokens, setTokens] = useState([...mockTokens])
  const onTokenRemove = (tokenId: string | number) => {
    setTokens(
      tokens.filter((token: { id: string | number }) => token.id !== tokenId),
    )
  }
  return (
    <div className={classes.GridContainer}>
      <FormControl>
        <FormControl.Label id="form-label">
          TextInputWithTokens
        </FormControl.Label>
        <TextInputWithTokens onTokenRemove={onTokenRemove} tokens={tokens} />
      </FormControl>
      <FormControl>
        <FormControl.Label id="autocomplete-label">
          Autocomplete
        </FormControl.Label>
        <Autocomplete>
          <Autocomplete.Input block />
          <Autocomplete.Overlay>
            <Autocomplete.Menu
              aria-labelledby="autocomplete-label"
              items={[
                {
                  text: 'css',
                  id: '0',
                },
                {
                  text: 'css-in-js',
                  id: '1',
                },
                {
                  text: 'styled-system',
                  id: '2',
                },
                {
                  text: 'javascript',
                  id: '3',
                },
                {
                  text: 'typescript',
                  id: '4',
                },
                {
                  text: 'react',
                  id: '5',
                },
                {
                  text: 'design-systems',
                  id: '6',
                },
              ]}
              selectedItemIds={[]}
            />
          </Autocomplete.Overlay>
        </Autocomplete>
      </FormControl>
      <FormControl>
        <FormControl.Label>Select</FormControl.Label>
        <Select>
          <Select.Option value="figma">Figma</Select.Option>
          <Select.Option value="css">Primer CSS</Select.Option>
          <Select.Option value="prc">Primer React components</Select.Option>
          <Select.Option value="pvc">Primer ViewComponents</Select.Option>
        </Select>
      </FormControl>
      <FormControl>
        <FormControl.Label>Textarea</FormControl.Label>
        <Textarea />
      </FormControl>
    </div>
  )
}
```

### Features: With Custom Input

```tsx
() => {
  const [value, setValue] = React.useState('mona lisa')
  const [validationResult, setValidationResult] = React.useState('')
  const doesValueContainSpaces = (inputValue: string) => /\s/g.test(inputValue)
  const handleInputChange = (e: {
    currentTarget: {
      value: React.SetStateAction<string>
    }
  }) => {
    setValue(e.currentTarget.value)
  }
  React.useEffect(() => {
    if (doesValueContainSpaces(value)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect, react-you-might-not-need-an-effect/no-chain-state-updates
      setValidationResult('noSpaces')
      // eslint-disable-next-line react-you-might-not-need-an-effect/no-event-handler
    } else if (value) {
      // eslint-disable-next-line react-you-might-not-need-an-effect/no-chain-state-updates
      setValidationResult('validName')
    }
  }, [value])
  return (
    <div className={classes.GridContainer}>
      <FormControl>
        <FormControl.Label htmlFor="custom-input">
          GitHub handle
        </FormControl.Label>
        <CustomTextInput
          id="custom-input"
          aria-describedby="custom-input-validation custom-input-caption"
          aria-invalid={validationResult === 'noSpaces'}
          onChange={handleInputChange}
        />
        {validationResult === 'noSpaces' && (
          <FormControl.Validation id="custom-input-validation" variant="error">
            GitHub handles cannot contain spaces
          </FormControl.Validation>
        )}
        {validationResult === 'validName' && (
          <FormControl.Validation
            id="custom-input-validation"
            variant="success"
          >
            Valid name
          </FormControl.Validation>
        )}
        <FormControl.Caption id="custom-input-caption">
          With or without &quot;@&quot;. For example &quot;monalisa&quot; or
          &quot;@monalisa&quot;
        </FormControl.Caption>
      </FormControl>

      <CheckboxGroup>
        <CheckboxGroup.Label>Checkboxes</CheckboxGroup.Label>
        <FormControl layout="horizontal">
          <CustomCheckboxInput
            id="custom-checkbox-one"
            aria-describedby="custom-checkbox-one-caption"
            value="checkOne"
          />
          <FormControl.Label htmlFor="custom-checkbox-one">
            Checkbox one
          </FormControl.Label>
          <FormControl.Caption id="custom-checkbox-one-caption">
            Hint text for checkbox one
          </FormControl.Caption>
        </FormControl>
        <FormControl layout="horizontal">
          <CustomCheckboxInput
            id="custom-checkbox-two"
            aria-describedby="custom-checkbox-two-caption"
            value="checkTwo"
          />
          <FormControl.Label htmlFor="custom-checkbox-two">
            Checkbox two
          </FormControl.Label>
          <FormControl.Caption id="custom-checkbox-two-caption">
            Hint text for checkbox two
          </FormControl.Caption>
        </FormControl>
      </CheckboxGroup>
    </div>
  )
}
```

### Features: With Checkbox And Radio Inputs

```tsx
() => {
  return (
    <div className={classes.GapContainer}>
      <CheckboxGroup>
        <CheckboxGroup.Label>Checkboxes</CheckboxGroup.Label>
        <FormControl>
          <Checkbox value="checkOne" />
          <FormControl.Label>Checkbox one</FormControl.Label>
        </FormControl>
        <FormControl>
          <Checkbox value="checkTwo" />
          <FormControl.Label>Checkbox two</FormControl.Label>
        </FormControl>
        <FormControl>
          <Checkbox value="checkThree" />
          <FormControl.Label>Checkbox three</FormControl.Label>
        </FormControl>
      </CheckboxGroup>

      <RadioGroup name={''}>
        <RadioGroup.Label>Radios</RadioGroup.Label>
        <FormControl>
          <Radio name="radioChoices" value="radioOne" />
          <FormControl.Label>Radio one</FormControl.Label>
        </FormControl>
        <FormControl>
          <Radio name="radioChoices" value="radioTwo" />
          <FormControl.Label>Radio two</FormControl.Label>
        </FormControl>
        <FormControl>
          <Radio name="radioChoices" value="radioThree" />
          <FormControl.Label>Radio three</FormControl.Label>
        </FormControl>
      </RadioGroup>
    </div>
  )
}
```
---
name: Spinner
description: "A Spinner is an indeterminate loading indicator, ideal for processes with unknown or variable durations."
import: "@primer/react"
docs: https://primer.style/product/components/spinner
a11y_docs: https://primer.style/product/components/spinner/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Spinner
storybook: https://primer.style/react/storybook/?path=/story/components-spinner
---

# Spinner

A Spinner is an indeterminate loading indicator, ideal for processes with unknown or variable durations.

## Usage

```tsx
import { Spinner } from '@primer/react'
```

### Example

```tsx
() => <Spinner />
```

## Props

```yaml
Spinner:
  size: { type: "'small' | 'medium' | 'large'", description: "Sets the width and height of the spinner." }
  srText: { type: "string | null", default: "Loading", description: "Sets the text conveyed by assistive technologies such as screen readers. Set to `null` if the loading state is displayed..." }
  aria-label: { type: "string", deprecated: true, description: "Sets the text conveyed by assistive technologies such as screen readers." }
  className: { type: "string" }
  data-*: { type: "string" }
  delay: { type: "boolean | 'short' | 'long' | number", default: "false", description: "Controls whether and how long to delay rendering the spinner. Set to `true` to delay by 1000ms, `'short'` to delay by 30..." }
```

## Examples

### Features: Small

```tsx
() => <Spinner size="small" />
```

### Features: Large

```tsx
() => <Spinner size="large" />
```

### Features: Suppress Screen Reader Text

```tsx
() => (
  <Stack direction="horizontal" className={classes.SuppressScreenReaderText}>
    <Spinner size="small" srText={null} />
    <AriaStatus>Loading...</AriaStatus>
  </Stack>
)
```
---
name: Stack
description: "Stack is a layout component that creates responsive horizontal and vertical flows."
import: "@primer/react"
docs: https://primer.style/product/components/stack
a11y_docs: https://primer.style/product/components/stack/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Stack
storybook: https://primer.style/react/storybook/?path=/story/components-stack
---

# Stack

Stack is a layout component that creates responsive horizontal and vertical flows.

## Usage

```tsx
import { Stack } from '@primer/react'
```

### Example

```tsx
() => (
  <Stack>
    <div
      style={{
        background: 'var(--display-lemon-bgColor-muted)',
        borderRadius: 'var(--borderRadius-medium)',
        padding: 'var(--base-size-8)',
      }}
    >
      First
    </div>
    <div
      style={{
        background: 'var(--display-olive-bgColor-muted)',
        borderRadius: 'var(--borderRadius-medium)',
        padding: 'var(--base-size-8)',
      }}
    >
      Second
    </div>
    <div
      style={{
        background: 'var(--display-lime-bgColor-muted)',
        borderRadius: 'var(--borderRadius-medium)',
        padding: 'var(--base-size-8)',
      }}
    >
      Third
    </div>
  </Stack>
)
```

## Props

```yaml
Stack:
  gap: { type: "'none' | 'tight' | 'condensed' | 'cozy' | 'normal' | 'spacious' | ResponsiveValue<'none' | 'tight' | 'condensed' | 'cozy' | 'normal' | 'spacious'>", description: "Specify the gap between children elements in the stack." }
  direction: { type: "'horizontal' | 'vertical' | ResponsiveValue<'horizontal' | 'vertical'>", description: "Specify the orientation for the stack container." }
  align: { type: "'stretch' | 'start' | 'center' | 'end' | 'baseline' | ResponsiveValue<'stretch' | 'start' | 'center' | 'end' | 'baseline'>", description: "Specify the alignment between items in the cross-axis of the orientation." }
  wrap: { type: "'wrap' | 'nowrap' | ResponsiveValue<'wrap' | 'nowrap'>", description: "Specify whether items are forced onto one line or can wrap onto multiple lines." }
  justify: { type: "'start' | 'center' | 'end' | 'space-between' | 'space-evenly' | ResponsiveValue<'start' | 'center' | 'end' | 'space-between' | 'space-evenly'>", description: "Specify how items will be distributed in the stacking direction." }
  padding: { type: "'none' | 'tight' | 'condensed' | 'cozy' | 'normal' | 'spacious' | ResponsiveValue<'none' | 'tight' | 'condensed' | 'cozy' | 'normal' | 'spacious'>", description: "Specify the padding of the stack container." }
  paddingBlock: { type: "'none' | 'tight' | 'condensed' | 'cozy' | 'normal' | 'spacious' | ResponsiveValue<'none' | 'tight' | 'condensed' | 'cozy' | 'normal' | 'spacious'>", description: "Specify the block (vertical) padding of the stack container. Overrides the block axis of padding when both are set." }
  paddingInline: { type: "'none' | 'tight' | 'condensed' | 'cozy' | 'normal' | 'spacious' | ResponsiveValue<'none' | 'tight' | 'condensed' | 'cozy' | 'normal' | 'spacious'>", description: "Specify the inline (horizontal) padding of the stack container. Overrides the inline axis of padding when both are set." }
  className: { type: "string" }

Stack.Item:
  grow: { type: "boolean | ResponsiveValue<boolean>", description: "Allow item to keep size or expand to fill the available space." }
  shrink: { type: "boolean | ResponsiveValue<boolean>", description: "Allow item to keep size or shrink to fit the available space." }
  className: { type: "string" }
```

## Examples

### Features: Gap Scale

```tsx
() => (
  <Stack gap="spacious">
    {(
      ['none', 'tight', 'condensed', 'cozy', 'normal', 'spacious'] as const
    ).map((gap) => (
      <Stack key={gap}>
        <span
          style={{
            fontSize: 'var(--text-body-size-small)',
            color: 'var(--fgColor-muted)',
          }}
        >
          gap=&quot;{gap}&quot;
        </span>
        <Stack direction="horizontal" gap={gap}>
          <Placeholder label="A" />
          <Placeholder label="B" />
          <Placeholder label="C" />
        </Stack>
      </Stack>
    ))}
  </Stack>
)
```

### Features: Directional Padding

```tsx
() => (
  <Stack gap="normal">
    <Stack
      padding="normal"
      style={{
        backgroundColor: 'var(--bgColor-muted)',
      }}
    >
      <Placeholder label='padding="normal" (all sides)' />
    </Stack>
    <Stack
      padding="normal"
      paddingInline="spacious"
      style={{
        backgroundColor: 'var(--bgColor-muted)',
      }}
    >
      <Placeholder label='padding="normal" paddingInline="spacious"' />
    </Stack>
    <Stack
      paddingBlock="condensed"
      paddingInline="spacious"
      style={{
        backgroundColor: 'var(--bgColor-muted)',
      }}
    >
      <Placeholder label='paddingBlock="condensed" paddingInline="spacious"' />
    </Stack>
  </Stack>
)
```

### Features: Padding Scale

```tsx
() => (
  <Stack gap="spacious">
    {(
      ['none', 'tight', 'condensed', 'cozy', 'normal', 'spacious'] as const
    ).map((padding) => (
      <Stack key={padding}>
        <span
          style={{
            fontSize: 'var(--text-body-size-small)',
            color: 'var(--fgColor-muted)',
          }}
        >
          padding=&quot;{padding}&quot;
        </span>
        <Stack
          padding={padding}
          style={{
            backgroundColor: 'var(--bgColor-muted)',
          }}
        >
          <Placeholder label="Content" />
        </Stack>
      </Stack>
    ))}
  </Stack>
)
```
---
name: Text
description: "An abstraction for using Primer's typographic styles."
import: "@primer/react"
docs: https://primer.style/product/components/text
a11y_docs: https://primer.style/product/components/text/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Text
storybook: https://primer.style/react/storybook/?path=/story/components-text
---

# Text

An abstraction for using Primer's typographic styles.

## Usage

```tsx
import { Text } from '@primer/react'
```

### Example

```tsx
() => <Text>Default Text</Text>
```

## Props

```yaml
Text:
  as: { type: "React.ElementType", default: "'span'" }
  size: { type: "'large' | 'medium' | 'small'" }
  weight: { type: "'light' | 'normal' | 'medium' | 'semibold'" }
  whiteSpace: { type: "'pre' | 'normal' | 'nowrap' | 'pre-wrap' | 'pre-line'" }
```

## Examples

### Features: Polymorphism

```tsx
() => (
  <div className={classes.PolymorphismContainer}>
    <Text as="em">Emphasized text</Text>
    <Text as="i">Italicized text</Text>
    <Text as="strong">Strong text</Text>
    <Text as="small">Small text</Text>
    <Text as="u">Text with underline</Text>
  </div>
)
```

### Features: Styled Text

```tsx
() => (
  <Text as="p" className={classes.StyledText} size="small">
    Stylized text
  </Text>
)
```

### Features: Size Small

```tsx
() => (
  <Text as="span" size="small">
    Stylized text
  </Text>
)
```
---
name: Heading
description: "Heading defines the hierarchical structure and importance of the content they contain."
import: "@primer/react"
docs: https://primer.style/product/components/heading
a11y_docs: https://primer.style/product/components/heading/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Heading
storybook: https://primer.style/react/storybook/?path=/story/components-heading
---

# Heading

Heading defines the hierarchical structure and importance of the content they contain.

## Usage

```tsx
import { Heading } from '@primer/react'
```

### Example

```tsx
() => <Heading>Default H2 Heading</Heading>
```

## Props

```yaml
Heading:
  as: { type: "React.ElementType", default: "'h2'" }
  variant: { type: "'large' | 'medium' | 'small'" }
```

## Examples

### Features: Small

```tsx
() => <Heading variant="small">Small heading</Heading>
```

### Features: Medium

```tsx
() => <Heading variant="medium">Medium heading</Heading>
```

### Features: Large

```tsx
() => <Heading variant="large">Large heading</Heading>
```
---
name: PageLayout
description: "PageLayout defines the header, main, pane, and footer areas of a page."
import: "@primer/react"
docs: https://primer.style/product/components/page-layout
a11y_docs: https://primer.style/product/components/page-layout/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/PageLayout
storybook: https://primer.style/react/storybook/?path=/story/components-page-layout
---

# PageLayout

PageLayout defines the header, main, pane, and footer areas of a page.

## Usage

```tsx
import { PageLayout } from '@primer/react'
```

### Example

```tsx
(args) => (
  <PageLayout
    containerWidth={args.containerWidth}
    padding={args.padding}
    rowGap={args.rowGap}
    columnGap={args.columnGap}
  >
    {args['Render header?'] ? (
      <PageLayout.Header
        padding={args['Header.padding']}
        divider={{
          narrow: args['Header.divider.narrow'],
          regular: args['Header.divider.regular'],
          wide: args['Header.divider.wide'],
        }}
        hidden={{
          narrow: args['Header.hidden.narrow'],
          regular: args['Header.hidden.regular'],
          wide: args['Header.hidden.wide'],
        }}
      >
        <Placeholder
          height={args['Header placeholder height']}
          label="Header"
        />
      </PageLayout.Header>
    ) : null}
    <PageLayout.Content
      width={args['Content.width']}
      padding={args['Content.padding']}
      hidden={{
        narrow: args['Content.hidden.narrow'],
        regular: args['Content.hidden.regular'],
        wide: args['Content.hidden.wide'],
      }}
    >
      <Placeholder
        height={args['Content placeholder height']}
        label="Content"
      />
    </PageLayout.Content>
    {args['Render pane?'] ? (
      <PageLayout.Pane
        position={{
          narrow: args['Pane.position.narrow'],
          regular: args['Pane.position.regular'],
          wide: args['Pane.position.wide'],
        }}
        width={args['Pane.width']}
        minWidth={args['Pane.minWidth']}
        sticky={args['Pane.sticky']}
        resizable={args['Pane.resizable']}
        padding={args['Pane.padding']}
        divider={{
          narrow: args['Pane.divider.narrow'],
          regular: args['Pane.divider.regular'],
          wide: args['Pane.divider.wide'],
        }}
        hidden={{
          narrow: args['Pane.hidden.narrow'],
          regular: args['Pane.hidden.regular'],
          wide: args['Pane.hidden.wide'],
        }}
      >
        <Placeholder height={args['Pane placeholder height']} label="Pane" />
      </PageLayout.Pane>
    ) : null}
    {args['Render footer?'] ? (
      <PageLayout.Footer
        padding={args['Footer.padding']}
        divider={{
          narrow: args['Footer.divider.narrow'],
          regular: args['Footer.divider.regular'],
          wide: args['Footer.divider.wide'],
        }}
        hidden={{
          narrow: args['Footer.hidden.narrow'],
          regular: args['Footer.hidden.regular'],
          wide: args['Footer.hidden.wide'],
        }}
      >
        <Placeholder
          height={args['Footer placeholder height']}
          label="Footer"
        />
      </PageLayout.Footer>
    ) : null}
  </PageLayout>
)
```

## Props

```yaml
PageLayout:
  containerWidth: { type: "| 'full' | 'medium' | 'large' | 'xlarge'", default: "'xlarge'", description: "The maximum width of the page container." }
  padding: { type: "| 'none' | 'condensed' | 'normal'", default: "'normal'", description: "The spacing between the outer edges of the page container and the viewport" }
  columnGap: { type: "| 'none' | 'condensed' | 'normal'", default: "'normal'" }
  rowGap: { type: "| 'none' | 'condensed' | 'normal'", default: "'normal'" }

PageLayout.Header:
  aria-label: { type: "string | undefined", description: "A unique label for the rendered banner landmark" }
  aria-labelledby: { type: "string | undefined", description: "An id to an element which uniquely labels the rendered banner landmark" }
  padding: { type: "| 'none' | 'condensed' | 'normal'", default: "'none'", description: "The amount of padding inside the header." }
  divider: { type: "| 'none' | 'line' | { narrow?: | 'none' | 'line' | 'filled' regular?: | 'none' | 'line' wide?: | 'none' | 'line' }", default: "'none'" }
  dividerWhenNarrow: { type: "| 'inherit' | 'none' | 'line' | 'filled'", default: "'inherit'", deprecated: true, description: "Use the divider prop with a responsive value instead." }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the header is hidden." }

PageLayout.Content:
  aria-label: { type: "string", description: "A unique label for the rendered main landmark" }
  aria-labelledby: { type: "string", description: "An id to an element which uniquely labels the rendered main landmark" }
  as: { type: "React.ElementType", default: "'main'", description: "Change the root node to another HTML element or custom component." }
  width: { type: "| 'full' | 'medium' | 'large' | 'xlarge'", default: "'full'", description: "The maximum width of the content region." }
  padding: { type: "| 'none' | 'condensed' | 'normal'", default: "'none'", description: "The amount of padding inside the content." }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageLayout.Pane:
  aria-label: { type: "string | undefined", description: "Label for the pane. Required if the pane overflows and doesn't have aria-labelledby." }
  aria-labelledby: { type: "string | undefined", description: "Id of an element that acts as a label for the pane. Required if the pane overflows and doesn't have aria-label." }
  width: { type: "| 'small' | 'medium' | 'large' | { min: string max: string default: string }", default: "'medium'", description: "The width of the pane. If using custom widths, provide an object with keys 'min', 'max' and 'default'." }
  minWidth: { type: "number", default: "256", description: "The minimum width of the pane." }
  resizable: { type: "boolean", default: "false", description: "When true, the pane may be resized by the user. Uses localStorage persistence by default. Note: with default persistence..." }
  currentWidth: { type: "number | undefined", description: "Current/controlled width value in pixels. Required when `onResizeEnd` is provided. Pass `undefined` when the persisted v..." }
  onResizeEnd: { type: "(width: number) => void", description: "Callback fired when a resize operation ends (drag release or keyboard key up). When provided, replaces localStorage pers..." }
  widthStorageKey: { type: "string", default: "'paneWidth'", description: "localStorage key used to persist the pane width across sessions. Only applies when `resizable` is `true` and no `onResiz..." }
  sticky: { type: "boolean", default: "false", description: "Whether the pane should stick to the top of the screen while the content scrolls." }
  offsetHeader: { type: "number | string", default: "0", description: "Use offsetHeader along with the sticky prop to push the sticky pane down to make room for a sticky header if necessary. ..." }
  padding: { type: "| 'none' | 'condensed' | 'normal'", default: "'none'", description: "The amount of padding inside the pane." }
  divider: { type: "| 'none' | 'line' | { narrow?: | 'none' | 'line' | 'filled' regular?: | 'none' | 'line' wide?: | 'none' | 'line' }", default: "'none'" }
  dividerWhenNarrow: { type: "| 'inherit' | 'none' | 'line' | 'filled'", default: "'inherit'", deprecated: true, description: "Use the divider prop with a responsive value instead." }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the pane is hidden." }
  position: { type: "'end' | 'start' | { narrow?: 'end' | 'start'; regular?: 'end' | 'start'; wide?: 'end' | 'start'; }", description: "Which side of the page the pane should be on. Can be changed for different viewport widths." }
  ref: { type: "React.RefObject<HTMLDivElement>" }

PageLayout.Sidebar:
  aria-label: { type: "string | undefined", description: "A unique label for the sidebar region." }
  aria-labelledby: { type: "string | undefined", description: "An id to an element which uniquely labels the sidebar region." }
  position: { type: "'start' | 'end'", default: "'start'", description: "Position of the sidebar relative to the page layout. The sidebar spans the full height of the layout, adjacent to the he..." }
  width: { type: "| 'small' | 'medium' | 'large' | { min: string max: string default: string }", default: "'medium'", description: "The width of the sidebar. If using custom widths, provide an object with keys 'min', 'max' and 'default'." }
  minWidth: { type: "number", default: "256", description: "Minimum width of the sidebar when resizable." }
  resizable: { type: "boolean", default: "false", description: "When true, the sidebar may be resized by the user. By default no persistence is applied; pass `widthStorageKey` to persi..." }
  currentWidth: { type: "number | undefined", description: "Current/controlled width value in pixels. Required when `onResizeEnd` is provided. Pass `undefined` when the persisted v..." }
  onResizeEnd: { type: "(width: number) => void", description: "Callback fired when a resize operation ends (drag release or keyboard key up). When provided, replaces localStorage pers..." }
  widthStorageKey: { type: "string", description: "localStorage key used to persist the sidebar width across sessions. Only applies when `resizable` is `true` and no `onRe..." }
  padding: { type: "| 'none' | 'condensed' | 'normal'", default: "'none'", description: "The amount of padding inside the sidebar." }
  divider: { type: "| 'none' | 'line'", default: "'none'", description: "Divider style between the sidebar and the rest of the layout." }
  sticky: { type: "boolean", default: "false", description: "Whether the sidebar sticks to the viewport when scrolling. When enabled, the sidebar uses position: sticky with top: 0 a..." }
  responsiveVariant: { type: "| 'default' | 'fullscreen'", default: "'default'", description: "Controls sidebar behavior at narrow viewport widths (below 768px). 'default' retains its normal inline layout. 'fullscre..." }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the sidebar is hidden." }

PageLayout.Footer:
  aria-label: { type: "string | undefined", description: "A unique label for the rendered contentinfo landmark" }
  aria-labelledby: { type: "string | undefined", description: "An id to an element which uniquely labels the rendered contentinfo landmark" }
  padding: { type: "| 'none' | 'condensed' | 'normal'", default: "'none'", description: "The amount of padding inside the footer." }
  divider: { type: "| 'none' | 'line' | { narrow?: | 'none' | 'line' | 'filled' regular?: | 'none' | 'line' wide?: | 'none' | 'line' }", default: "'none'" }
  dividerWhenNarrow: { type: "| 'inherit' | 'none' | 'line' | 'filled'", default: "'inherit'", deprecated: true, description: "Use the divider prop with a responsive value instead." }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the footer is hidden." }
```

## Examples

### Features: Pull Request Page

```tsx
() => (
  <PageLayout>
    <PageLayout.Header>
      <div className={classes.HeaderStack}>
        <div>
          <Heading as="h1" className={classes.TitleHeading}>
            Input validation styles{' '}
            <Text className={classes.TitleSubdued}>#1831</Text>
          </Heading>
          <div className={classes.StatusRow}>
            <StateLabel status="pullOpened">Open</StateLabel>
            <Text className={classes.StatusMeta}>
              <Link href="#" muted className={classes.BoldMetaLink}>
                mperrotti
              </Link>{' '}
              wants to merge 3 commits into{' '}
              <BranchName href="#">main</BranchName> from{' '}
              <BranchName href="#">mp/validation-styles</BranchName>
            </Text>
          </div>
        </div>
        <TabNav>
          <TabNav.Link href="#" selected>
            Conversation
          </TabNav.Link>
          <TabNav.Link href="#">Commits</TabNav.Link>
          <TabNav.Link href="#">Checks</TabNav.Link>
          <TabNav.Link href="#">Files changed</TabNav.Link>
        </TabNav>
      </div>
    </PageLayout.Header>
    <PageLayout.Content>
      <div className={classes.ContentBox}></div>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div className={classes.ScrollBox} tabIndex={0}>
        This box has really long content. If it is too long, it will cause x
        overflow and should show a scrollbar. When this overflows, it should not
        break to overall page layout!
      </div>
    </PageLayout.Content>
    <PageLayout.Pane aria-label="Side pane">
      <div className={classes.PaneStack}>
        <div>
          <Text className={classes.PaneSectionHeading}>Assignees</Text>
          <Text className={classes.PaneMetaText}>
            No one –{' '}
            <Link href="#" muted>
              assign yourself
            </Link>
          </Text>
        </div>
        <div role="separator" className={classes.PaneSeparator}></div>
        <div>
          <Text className={classes.PaneSectionHeading}>Labels</Text>
          <Text className={classes.PaneMetaText}>None yet</Text>
        </div>
      </div>
    </PageLayout.Pane>
  </PageLayout>
)
```

### Features: Sticky Pane

```tsx
(args) => (
  <PageLayout
    rowGap="none"
    columnGap="none"
    padding="none"
    containerWidth="full"
  >
    <PageLayout.Header padding="normal" divider="line">
      <Placeholder label="Header" height={64} />
    </PageLayout.Header>
    <PageLayout.Content padding="normal" width="large">
      <div className={classes.ContentGrid}>
        {Array.from({
          length: args.numParagraphsInContent,
        }).map((_, i) => {
          const testId = `content${i}`
          return (
            <p key={i} className={classes.Paragraph}>
              <span data-testid={testId}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                enim id lorem tempus egestas a non ipsum. Maecenas imperdiet
                ante quam, at varius lorem molestie vel. Sed at eros consequat,
                varius tellus et, auctor felis. Donec pulvinar lacinia urna nec
                commodo. Phasellus at imperdiet risus. Donec sit amet massa
                purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus
                felis. Ut porttitor auctor tellus in imperdiet. Ut blandit
                tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum
                auctor euismod nisi. Nullam tincidunt est in mi tincidunt
                dictum. Sed consectetur aliquet velit ut ornare.
              </span>
            </p>
          )
        })}
      </div>
    </PageLayout.Content>
    <PageLayout.Pane
      position="start"
      resizable
      padding="normal"
      divider="line"
      sticky={args.sticky}
      aria-label="Side pane"
    >
      <div className={classes.ContentGrid}>
        {Array.from({
          length: args.numParagraphsInPane,
        }).map((_, i) => {
          const testId = `paragraph${i}`
          return (
            <p key={i} className={classes.Paragraph}>
              <span data-testid={testId}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                enim id lorem tempus egestas a non ipsum. Maecenas imperdiet
                ante quam, at varius lorem molestie vel. Sed at eros consequat,
                varius tellus et, auctor felis. Donec pulvinar lacinia urna nec
                commodo. Phasellus at imperdiet risus. Donec sit amet massa
                purus.
              </span>
            </p>
          )
        })}
        <p>
          Donec sit amet massa purus.{' '}
          <Link inline href="#foo">
            Plura de lorem Ispum.
          </Link>
        </p>
      </div>
    </PageLayout.Pane>
    <PageLayout.Footer padding="normal" divider="line">
      <Placeholder label="Footer" height={64} />
    </PageLayout.Footer>
  </PageLayout>
)
```

### Features: Nested Scroll Container

```tsx
(args) => (
  <div className={classes.NestedScrollContainer}>
    <Placeholder label="Above scroll container" height={120} />
    <div className={classes.OverflowAuto}>
      <PageLayout
        rowGap="none"
        columnGap="none"
        padding="none"
        containerWidth="full"
      >
        <PageLayout.Header padding="normal" divider="line">
          <Placeholder label="Header" height={64} />
        </PageLayout.Header>
        <PageLayout.Content padding="normal" width="large">
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <div
            className={classes.ContentGrid}
            tabIndex={0}
            role="region"
            aria-label="Page content"
          >
            {Array.from({
              length: args.numParagraphsInContent,
            }).map((_, i) => (
              <p key={i} className={classes.Paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                enim id lorem tempus egestas a non ipsum. Maecenas imperdiet
                ante quam, at varius lorem molestie vel. Sed at eros consequat,
                varius tellus et, auctor felis. Donec pulvinar lacinia urna nec
                commodo. Phasellus at imperdiet risus. Donec sit amet massa
                purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus
                felis. Ut porttitor auctor tellus in imperdiet. Ut blandit
                tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum
                auctor euismod nisi. Nullam tincidunt est in mi tincidunt
                dictum. Sed consectetur aliquet velit ut ornare.
              </p>
            ))}
          </div>
        </PageLayout.Content>
        <PageLayout.Pane
          position="start"
          padding="normal"
          divider="line"
          sticky
          aria-label="Side pane"
        >
          <div className={classes.ContentGrid}>
            {Array.from({
              length: args.numParagraphsInPane,
            }).map((_, i) => (
              <p key={i} className={classes.Paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                enim id lorem tempus egestas a non ipsum. Maecenas imperdiet
                ante quam, at varius lorem molestie vel. Sed at eros consequat,
                varius tellus et, auctor felis. Donec pulvinar lacinia urna nec
                commodo. Phasellus at imperdiet risus. Donec sit amet massa
                purus.
              </p>
            ))}
          </div>
        </PageLayout.Pane>
        <PageLayout.Footer padding="normal" divider="line">
          <Placeholder label="Footer" height={64} />
        </PageLayout.Footer>
      </PageLayout>
    </div>
    <Placeholder label="Below scroll container" height={120} />
  </div>
)
```
---
name: Label
description: "Use the label component to add contextual metadata to a design."
import: "@primer/react"
docs: https://primer.style/product/components/label
a11y_docs: https://primer.style/product/components/label/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Label
storybook: https://primer.style/react/storybook/?path=/story/components-label
---

# Label

Use the label component to add contextual metadata to a design.

## Usage

```tsx
import { Label } from '@primer/react'
```

### Example

```tsx
() => <Label>Default</Label>
```

## Props

```yaml
Label:
  variant: { type: "| 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'attention' | 'severe' | 'danger' | 'done' | 'sponsors'", default: "'default'", description: "The color of the label" }
  size: { type: "'small' | 'large'", default: "'small'", description: "How large the label is rendered" }
```

## Examples

### Features: Primary

```tsx
() => <Label variant="primary">Primary</Label>
```

### Features: Secondary

```tsx
() => <Label variant="secondary">Secondary</Label>
```

### Features: Accent

```tsx
() => <Label variant="accent">Accent</Label>
```
---
name: StateLabel
description: "StateLabel is used for rendering the status of an issue or pull request."
import: "@primer/react"
docs: https://primer.style/product/components/state-label
a11y_docs: https://primer.style/product/components/state-label/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/StateLabel
storybook: https://primer.style/react/storybook/?path=/story/components-state-label
---

# StateLabel

StateLabel is used for rendering the status of an issue or pull request.

## Usage

```tsx
import { StateLabel } from '@primer/react'
```

### Example

```tsx
() => <StateLabel status="issueOpened">Open</StateLabel>
```

## Props

```yaml
StateLabel:
  size: { type: "'small' | 'medium'", default: "'medium'" }
  variant: { type: "'small' | 'normal'", default: "'normal'", deprecated: true, description: "Use `size` instead." }
  status: { type: "'issueOpened' | 'issueClosed' | 'issueClosedNotPlanned' | 'pullOpened' | 'pullClosed' | 'pullMerged' | 'draft' | 'issueDraft' | 'pullQueued' | 'unavailable' | 'alertOpened' | 'alertFixed' | 'alertDismissed' | 'alertClosed' | 'open' | 'closed' | 'archived'", required: true }
```

## Examples

### Features: Issue Closed

```tsx
() => <StateLabel status="issueClosed">Closed</StateLabel>
```

### Features: Issue Closed Not Planned

```tsx
() => <StateLabel status="issueClosedNotPlanned">Closed</StateLabel>
```

### Features: Issue Draft

```tsx
() => <StateLabel status="issueDraft">Draft</StateLabel>
```

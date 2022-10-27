# Numeral

> format number

## Install

```shell
npm install @p12/numeral
```

## How to use

### Format Props

| Name          | Type        | Default           | Description           |
|---------------|-------------|-------------------|-----------------------|
| type          | NumeralType | NumeralType.Token | format input          |
| decimalPlaces | number?     | undefined         | format decimal places |

### Numeral Type

```typescript
enum NumeralType {
  GameCoin,
  Token,
  Transfer,
}
```

### Numeral

```typescript
import {numeral, NumeralType} from '@p12/numeral';

const format1 = numeral('1028').format(NumeralType.GameCoin); // 1.028K
const format2 = numeral('1028').format(NumeralType.GameCoin, 2); // 1.03K
```

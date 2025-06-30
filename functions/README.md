# Ambassador Academy Email Notifications

Firebase Cloud Functions for handling automated email notifications in the Ambassador Academy application system.

## Quick Start

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Deploy to Firebase
npm run deploy
```

## Available Functions

### `onApplicationStatusChange`

Sends email notifications when an application's status changes to "approved".

#### Trigger
- Collection: `applications`
- Event: `onUpdate`
- Condition: `newData.status === 'approved' && previousData.status !== 'approved'`

#### Configuration

Required environment variables (set using Firebase Config):
```bash
firebase functions:config:set smtp.host="your-smtp-host" \
                          smtp.user="your-smtp-username" \
                          smtp.pass="your-smtp-password"
```

## Development

```bash
# Watch for changes
npm run build:watch

# Run emulator
npm run serve

# Run tests
npm run test
```

## Available Scripts

- `npm run lint` - Run ESLint
- `npm run build` - Build TypeScript
- `npm run serve` - Run local emulator
- `npm run deploy` - Deploy to Firebase
- `npm run logs` - View function logs

## Troubleshooting

Check the main documentation at `../EMAIL_NOTIFICATIONS_GUIDE.md` for detailed troubleshooting steps.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests
4. Submit a pull request

## License

Internal use only - Ambassador Academy © 2024 
# MongoDB Connection Troubleshooting Guide

## Error: SSL/TLS Connection Error

If you're seeing this error:
```
MongoServerSelectionError: 4C3D0000:error:0A000438:SSL routines:ssl3_read_bytes:tlsv1 alert internal error
```

### Common Causes & Solutions

#### 1. **MongoDB Cluster IP Whitelist** (Most Common)
Your MongoDB cluster needs to allow connections from your IP address.

**Solution:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Navigate to your project → **Network Access** → **IP Access List**
3. Click **Add IP Address**
4. For development, you can use `0.0.0.0/0` (allows all IPs - NOT for production!)
5. For production, add your specific server IP

#### 2. **Connection String Issues**
Verify your connection string format:

**Correct format:**
```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority&appName=AppName
```

**Check for:**
- Username and password are URL-encoded (e.g., `@` becomes `%40`)
- Database name is included
- No extra spaces or characters

#### 3. **Network/Firewall Issues**
If you're behind a corporate firewall or VPN:

**Solutions:**
- Try disabling VPN temporarily to test
- Contact your network administrator to allow MongoDB Atlas IPs
- Check if your ISP blocks port 27017 (MongoDB's default port)

#### 4. **MongoDB Connection String has Changed**
If you recently reset your credentials:

1. Go to MongoDB Atlas → Your Project
2. Click **Connect** → **Connect your application**
3. Copy the new connection string
4. Update `.env.local` with the new `MONGODB_URI`
5. Restart your development server

#### 5. **Deprecated TLS Version**
MongoDB Atlas now requires TLS 1.2+. If you're on an old Node.js version:

**Solution - Update Node.js:**
```powershell
# Check current version
node --version

# Should be v14+ (ideally v18+)
# Update from https://nodejs.org
```

### Testing Your Connection

Run the connection test script:

```powershell
npx ts-node lib/mongoTest.ts
```

This will:
- ✅ Attempt to connect to MongoDB
- ✅ Verify the database exists
- ✅ List all collections
- ✅ Show any connection errors

### Debug Checklist

- [ ] MongoDB URI is set in `.env.local`
- [ ] Cluster whitelist includes `0.0.0.0/0` (or your IP)
- [ ] Connection string is correctly formatted
- [ ] Database name matches what's in MongoDB
- [ ] Node.js version is v14 or higher
- [ ] Development server restarted after env changes
- [ ] No VPN/Firewall blocking the connection

### If Still Not Working

1. Check MongoDB Atlas status at https://status.mongodb.com
2. Try connecting from MongoDB Compass to verify credentials
3. Check your browser console for form submission errors
4. Look at terminal/console output for detailed error messages

### Contact Form Submission Flow

```
Form Submit 
    ↓
/api/contact POST endpoint
    ↓
MongoDB Client connects
    ↓
Insert document into "contacts" collection
    ↓
Return success/error response
    ↓
Display message to user
```

If connection fails at step 2-3, the error will show:
```json
{
  "error": "MongoDB SSL connection error. Please check your MongoDB cluster whitelist and network connectivity.",
  "details": "..."
}
```

### Quick Fix: Allow All IPs (Development Only)

1. MongoDB Atlas → Network Access
2. Click "Edit" on existing entries or "Add IP Address"
3. Enter `0.0.0.0/0`
4. Add comment: "Development - all IPs"
5. Confirm

⚠️ **Warning**: Only use `0.0.0.0/0` for development/testing. Always restrict to specific IPs in production!

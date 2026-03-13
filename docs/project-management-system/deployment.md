# Deployment Guide

This guide covers deploying the Project Management System to various platforms.

## Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Prerequisites
- Vercel account (free at vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)

### Steps

1. **Push to Git**
   ```bash
   git push origin main
   ```

2. **Import Project on Vercel**
   - Visit [vercel.com/import](https://vercel.com/import)
   - Select your repository
   - Configure project settings
   - Click "Deploy"

3. **Automatic Deployments**
   - Vercel automatically deploys on every push
   - Preview deployments for pull requests

### Environment Variables
Create a `.env.local` file (development only):
```
NODE_ENV=production
```

## Self-Hosted Deployment

### Using Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t pms .
docker run -p 3000:3000 pms
```

### Using PM2

```bash
npm install -g pm2

# Start application
pm2 start "npm start" --name "pms"

# Monitor
pm2 monit

# View logs
pm2 logs pms
```

### Using systemd (Linux)

Create `/etc/systemd/system/pms.service`:
```ini
[Unit]
Description=Project Management System
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/pms
ExecStart=/usr/bin/npm start
Restart=on-failure
StandardOutput=append:/var/log/pms.log

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable pms
sudo systemctl start pms
```

## Build Optimization

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Environment-Specific Configuration

Create `.env.production`:
```
NODE_ENV=production
DATABASE_URL=your_production_database_url
```

## Database Setup

### SQLite (Current)
Database file is stored at `data/pms.db`.

### Migrating to PostgreSQL

1. Install Prisma:
   ```bash
   npm install prisma
   ```

2. Update connection string in environment variables

3. Run migrations

## Monitoring

### Application Health
- Monitor error logs
- Track response times
- Check CPU and memory usage

### Database Monitoring
- Monitor query performance
- Track database size
- Set up backups

### Recommended Tools
- PM2 (process management)
- New Relic (APM)
- Sentry (error tracking)
- LogRocket (session replay)

## Performance Optimization

### Caching
- Enable browser caching
- Use CDN for static assets
- Implement API response caching

### Database
- Add indexes to frequently queried columns
- Optimize queries
- Consider read replicas for high traffic

### Frontend
- Enable code splitting
- Optimize images
- Use gzip compression

## Security

### HTTPS
- Always use HTTPS in production
- Get SSL certificate from Let's Encrypt or commercial provider

### Headers
Add security headers in `next.config.js`:
```javascript
async headers() {
  return [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff"
        }
      ]
    }
  ]
}
```

### Environment Variables
- Never commit `.env.local` or `.env.production.local`
- Use platform-specific secrets management
- Rotate keys regularly

## Backup and Recovery

### Database Backups
```bash
# SQLite backup
cp data/pms.db data/pms.db.backup

# Automated daily backup (cron)
0 2 * * * cp data/pms.db data/pms.db.$(date +\%Y\%m\%d)
```

### Disaster Recovery
- Maintain off-site backups
- Test recovery procedures regularly
- Document recovery steps

## Scaling

### Horizontal Scaling
- Run multiple instances behind load balancer
- Use managed database service
- Implement session management

### Vertical Scaling
- Increase server resources
- Upgrade database tier
- Optimize code

## Post-Deployment

1. **Verify Functionality**
   - Test core features
   - Check API endpoints
   - Verify database operations

2. **Monitor Logs**
   - Check application logs
   - Review error tracking
   - Monitor performance metrics

3. **Set Up Alerts**
   - CPU/Memory alerts
   - Error rate alerts
   - Uptime monitoring

## Troubleshooting

### Application Won't Start
- Check Node.js version (18+)
- Verify dependencies installed
- Check logs for errors

### Database Connection Failed
- Verify database URL
- Check database service is running
- Verify credentials

### High Memory Usage
- Check for memory leaks
- Optimize queries
- Increase available memory

## Next Steps

- Set up CI/CD pipeline
- Implement monitoring
- Configure backups
- Plan scaling strategy

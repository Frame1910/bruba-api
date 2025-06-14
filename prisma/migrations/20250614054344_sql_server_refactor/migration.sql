BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] NVARCHAR(1000) NOT NULL,
    [firstName] NVARCHAR(1000) NOT NULL,
    [lastName] NVARCHAR(1000) NOT NULL,
    [mobile] NVARCHAR(1000),
    [email] NVARCHAR(1000),
    [dietary] NVARCHAR(1000),
    [allergies] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [users_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [users_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[invites] (
    [code] NVARCHAR(1000) NOT NULL,
    [allowPlusOne] BIT NOT NULL,
    [sportsCarnival] BIT NOT NULL CONSTRAINT [invites_sportsCarnival_df] DEFAULT 0,
    [bustransport] NVARCHAR(1000) NOT NULL CONSTRAINT [invites_bustransport_df] DEFAULT 'PENDING',
    [address] NVARCHAR(1000),
    [firstSeenAt] DATETIME2,
    [lastSeenAt] DATETIME2,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [invites_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [invites_pkey] PRIMARY KEY CLUSTERED ([code])
);

-- CreateTable
CREATE TABLE [dbo].[user_invites] (
    [userId] NVARCHAR(1000) NOT NULL,
    [inviteCode] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [user_invites_status_df] DEFAULT 'PENDING',
    [scstatus] NVARCHAR(1000) NOT NULL CONSTRAINT [user_invites_scstatus_df] DEFAULT 'PENDING',
    [isPlusOne] BIT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [user_invites_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [user_invites_pkey] PRIMARY KEY CLUSTERED ([userId],[inviteCode])
);

-- AddForeignKey
ALTER TABLE [dbo].[user_invites] ADD CONSTRAINT [user_invites_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[user_invites] ADD CONSTRAINT [user_invites_inviteCode_fkey] FOREIGN KEY ([inviteCode]) REFERENCES [dbo].[invites]([code]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[metadata] (
    [event] NVARCHAR(1000) NOT NULL,
    [datetime] DATETIME2 NOT NULL CONSTRAINT [metadata_datetime_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [metadata_pkey] PRIMARY KEY CLUSTERED ([event])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

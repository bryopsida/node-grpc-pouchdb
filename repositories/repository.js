/** @module repositories/repository */

const PouchDB = require('pouchdb')

/**
 * @callback FilterFunction
 * @param {any} doc A document object
 * @returns {boolean} True to include the document false to execlude
 */

/**
 * @typedef ReplicationFilterOptions
 * @property {Array<string>?} ids optional array of document IDs the replication is limited to
 * @property {FilterFunction?} function optional delegate to filter docs included in replication
 * @property {Record<string, any>?} queryParams optional map of params passed to filter function
 * @property {string?} selector optional selector using pouchdb-find
 * @property {string?} view optional view name to filter by
 */

/**
 * @typedef ReplicationTargets
 * @property {string?} sourceUrl optional url for source database that should replicate to the target database, when not provided it assumes the source
 *                               is the database housed in the repository. This can be used to replicate changes from a remote database to this local database.
 * @property {string} targetUrl url that replication requests will be sent to, required
 * @property {boolean?} live live flag will be set in replcation options, defaults true
 * @property {boolean?} retry retry flag will be set in replication options, defaults true
 * @property {string?} username optional username for credentials to remote target
 * @property {string?} password optional password for credentials to remote target
 * @property {ReplicationFilterOptions?} filterOptions optional filter options to reduce what's replicated instead of full database replication
 *
 */

/**
 * @typedef module:repositories/repository.RepositoryOptions
 * @property {string} databaseUrl Required url for database location, for a local database 'database-name' will stick a leveldb next to the running process
 *                                You can use ldb://path/on/disk/dbname.db to specify a local path. If you want to sync to a remote couchdb use
 *                                https://couchdb.hostname.com/databasename.
 * @property {string?} username optional username when using a database with required credentials
 * @property {string?} password optional password when using a database with required credentials
 * @property {Array<ReplicationTargets>?} replicationTargets Optional array of replication targets
 * @property {any?} adapterOptions optional pass through to the underlying adapter options
 */

/**
 *
 */
class Repository {
  /**
     * Repository constructor
     * @param {module:repositories/repository.RepositoryOptions} opts
     */
  constructor (opts) {
    if (this.opts == null) throw new Error('opts must be provided!')
    if (this.opts.databaseUrl == null) throw new Error('opts.databaseUrl must be provided!')
    this.db = new PouchDB(opts.databaseUrl, {
      ...{
        auth: {
          username: opts.username,
          password: opts.password
        }
      },
      ...opts.adapterOptions
    })
    this.addReplicationRules(opts.replicationTargets)
  }

  /**
     * Add replication rules
     * @param {Array<ReplicationFilterOptions>?} replicationTargets set of replication rules/targets
     */
  addReplicationRules (replicationTargets) {
    if (!replicationTargets) return
    // TODO: wire replication rules
  }
}

module.exports = {
  Repository
}

"use client";

import { useState } from "react";
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  Download, 
  Filter, 
  Search,
  Calendar,
  ChevronDown,
  MoreVertical,
  X
} from "lucide-react";
import { getAllTransactions, Transaction } from "@/features/dashboard/lib/transactions";

export default function TransactionsPage() {
  const [transactions] = useState<Transaction[]>(getAllTransactions());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter transactions based on search and filters
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = searchTerm === "" || 
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || transaction.direction === filterType;
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate summary statistics
  const totalIn = filteredTransactions
    .filter(t => t.direction === "in")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalOut = filteredTransactions
    .filter(t => t.direction === "out")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const netFlow = totalIn - totalOut;

  return (
    <div className="space-y-4 md:space-y-6 text-text-primary">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Transaction History</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            View and manage all your financial transactions
          </p>
        </div>
        
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors w-full md:w-auto active:scale-[0.98]">
          <Download className="h-4 w-4" />
          <span>Export Statement</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">Total Inflow</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-500 mt-1">
                UGX {totalIn.toLocaleString()}
              </p>
            </div>
            <ArrowDownRight className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-emerald-500 flex-shrink-0" />
          </div>
        </div>
        
        <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">Total Outflow</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-rose-500 mt-1">
                UGX {totalOut.toLocaleString()}
              </p>
            </div>
            <ArrowUpRight className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-rose-500 flex-shrink-0" />
          </div>
        </div>
        
        <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3 md:p-4 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">Net Flow</p>
              <p className={`text-lg sm:text-xl md:text-2xl font-bold mt-1 ${netFlow >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                {netFlow >= 0 ? "+" : "-"} UGX {Math.abs(netFlow).toLocaleString()}
              </p>
            </div>
            <Calendar className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-blue-500 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex items-center justify-between">
        <div className="text-sm font-medium">
          {filteredTransactions.length} transactions
        </div>
        <button 
          onClick={() => setMobileFiltersOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/5 transition-colors"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Mobile Filters Overlay */}
      {mobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          
          {/* Filters Panel */}
          <div className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-card border-l border-white/5 shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button 
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 hover:bg-white/5 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Transaction Type</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setFilterType("all")}
                    className={`px-3 py-2 rounded-lg text-sm ${filterType === "all" ? "bg-primary text-white" : "bg-white/5 border border-white/10"}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterType("in")}
                    className={`px-3 py-2 rounded-lg text-sm ${filterType === "in" ? "bg-emerald-500 text-white" : "bg-white/5 border border-white/10"}`}
                  >
                    Incoming
                  </button>
                  <button
                    onClick={() => setFilterType("out")}
                    className={`px-3 py-2 rounded-lg text-sm ${filterType === "out" ? "bg-rose-500 text-white" : "bg-white/5 border border-white/10"}`}
                  >
                    Outgoing
                  </button>
                </div>
              </div>
              
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFilterStatus("all")}
                    className={`px-3 py-2 rounded-lg text-sm ${filterStatus === "all" ? "bg-primary text-white" : "bg-white/5 border border-white/10"}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterStatus("completed")}
                    className={`px-3 py-2 rounded-lg text-sm ${filterStatus === "completed" ? "bg-emerald-500 text-white" : "bg-white/5 border border-white/10"}`}
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => setFilterStatus("pending")}
                    className={`px-3 py-2 rounded-lg text-sm ${filterStatus === "pending" ? "bg-amber-500 text-white" : "bg-white/5 border border-white/10"}`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setFilterStatus("failed")}
                    className={`px-3 py-2 rounded-lg text-sm ${filterStatus === "failed" ? "bg-rose-500 text-white" : "bg-white/5 border border-white/10"}`}
                  >
                    Failed
                  </button>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/5">
                <button 
                  onClick={() => {
                    setFilterType("all");
                    setFilterStatus("all");
                    setSearchTerm("");
                  }}
                  className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
              <button 
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full px-4 py-2.5 rounded-lg bg-primary text-white font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Filters and Search */}
      <div className="hidden md:block rounded-xl border border-white/5 bg-card p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transactions by type, description, or reference..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* Type Filter */}
            <div className="relative">
              <select
                className="appearance-none bg-white/5 border border-white/10 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-text-primary/50"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option className="text-primary" value="all">All Types</option>
                <option className="text-primary" value="in">Incoming</option>
                <option className="text-primary" value="out">Outgoing</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
            </div>
            
            {/* Status Filter */}
            <div className="relative">
              <select
                className="appearance-none bg-white/5 border border-white/10 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option className="text-primary" value="all">All Status</option>
                <option className="text-primary" value="completed">Completed</option>
                <option className="text-primary" value="pending">Pending</option>
                <option className="text-primary" value="failed">Failed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
            </div>
            
            <button className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/5 transition-colors">
              <Filter className="h-4 w-4" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {filteredTransactions.length === transactions.length ? (
          `Showing all ${transactions.length} transactions`
        ) : (
          `Showing ${filteredTransactions.length} of ${transactions.length} transactions`
        )}
      </div>

      {/* Mobile Transactions List */}
      <div className="md:hidden space-y-3">
        {paginatedTransactions.length > 0 ? (
          paginatedTransactions.map((t) => {
            const isIn = t.direction === "in";
            const statusColor = t.status === "completed" ? "text-emerald-500" : 
                              t.status === "pending" ? "text-amber-500" : 
                              "text-rose-500";
            
            return (
              <div 
                key={t.id} 
                className="rounded-xl border border-white/5 bg-card p-4 space-y-3"
              >
                {/* Transaction Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      isIn ? "bg-emerald-500/10" : "bg-rose-500/10"
                    }`}>
                      {isIn ? (
                        <ArrowDownRight className="h-5 w-5 text-emerald-400" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-rose-400" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{t.type}</div>
                      <div className="text-xs text-muted-foreground">{t.category}</div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/5 rounded-lg">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>

                {/* Description */}
                <div className="text-sm text-muted-foreground">
                  {t.description}
                </div>

                {/* Amount and Status */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className={`font-bold ${isIn ? "text-emerald-400" : "text-rose-400"}`}>
                    {isIn ? "+" : "-"} UGX {t.amount.toLocaleString()}
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${statusColor} ${t.status === "completed" ? "bg-emerald-500/10" : t.status === "pending" ? "bg-amber-500/10" : "bg-rose-500/10"}`}>
                    {t.status}
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-white/5">
                  <span>{t.date}</span>
                  <span>{t.reference}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-xl border border-white/5 bg-card p-8 text-center">
            <div className="text-muted-foreground mb-2">
              No transactions found matching your filters.
            </div>
            <button 
              onClick={() => {
                setFilterType("all");
                setFilterStatus("all");
                setSearchTerm("");
              }}
              className="text-sm text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Desktop Transactions Table */}
      <div className="hidden md:block rounded-xl border border-white/5 bg-card overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 px-6 py-4 border-b border-white/5 text-sm font-medium text-muted-foreground">
          <div className="col-span-5">Transaction</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2 text-right">Amount</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-1 text-right">Date</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-white/5">
          {paginatedTransactions.length > 0 ? (
            paginatedTransactions.map((t) => {
              const isIn = t.direction === "in";
              const statusColor = t.status === "completed" ? "bg-emerald-500/10 text-emerald-400" : 
                                t.status === "pending" ? "bg-amber-500/10 text-amber-400" : 
                                "bg-rose-500/10 text-rose-400";
              
              return (
                <div 
                  key={t.id} 
                  className="grid grid-cols-12 px-6 py-4 hover:bg-white/5 transition-colors items-center"
                >
                  {/* Transaction Details */}
                  <div className="col-span-5 flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      isIn ? "bg-emerald-500/10" : "bg-rose-500/10"
                    }`}>
                      {isIn ? (
                        <ArrowDownRight className="h-5 w-5 text-emerald-400" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-rose-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium truncate">{t.type}</div>
                      <div className="text-sm text-muted-foreground truncate">{t.description}</div>
                      <div className="text-xs text-muted-foreground mt-1">{t.reference}</div>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-span-2">
                    <span className="text-sm px-3 py-1 rounded-full bg-white/5 inline-block">
                      {t.category}
                    </span>
                  </div>

                  {/* Amount */}
                  <div className="col-span-2 text-right">
                    <div className={`font-medium tabular-nums ${isIn ? "text-emerald-400" : "text-rose-400"}`}>
                      {isIn ? "+" : "-"} UGX {t.amount.toLocaleString()}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-2 text-center">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor} capitalize`}>
                      {t.status}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="col-span-1 text-left">
                    <div className="text-xs">{t.date}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="text-muted-foreground mb-2">
                No transactions found matching your filters.
              </div>
              <button 
                onClick={() => {
                  setFilterType("all");
                  setFilterStatus("all");
                  setSearchTerm("");
                }}
                className="text-sm text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Pagination - Responsive */}
      {filteredTransactions.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/5">
          <div className="text-sm text-muted-foreground text-center sm:text-left">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            
            {/* Mobile pagination */}
            <div className="flex items-center gap-1 sm:hidden">
              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 3) {
                  pageNum = i + 1;
                } else if (currentPage <= 2) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 1) {
                  pageNum = totalPages - 2 + i;
                } else {
                  pageNum = currentPage - 1 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`h-8 w-8 rounded-md border text-sm ${currentPage === pageNum ? "bg-primary text-white border-primary" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 3 && currentPage < totalPages - 1 && (
                <>
                  <span className="text-muted-foreground">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`h-8 w-8 rounded-md border text-sm ${currentPage === totalPages ? "bg-primary text-white border-primary" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            
            {/* Desktop pagination */}
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`h-8 w-8 rounded-md border text-sm ${currentPage === pageNum ? "bg-primary text-white border-primary" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="text-muted-foreground">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`h-8 w-8 rounded-md border text-sm ${currentPage === totalPages ? "bg-primary text-white border-primary" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}